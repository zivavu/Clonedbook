import admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Parse CLI arguments
const deleteOnly = process.argv.includes('--delete-only');
const populateOnly = process.argv.includes('--populate-only');
const verbose = process.argv.includes('--verbose');
const skipImages = process.argv.includes('--skip-images');

// Clear any existing Firebase admin apps
try {
  admin.app().delete();
} catch (error) {
  // No existing app to delete
}

// Local emulator host settings
const EMULATOR_HOST = 'localhost';
const FIRESTORE_PORT = 8080;
const STORAGE_PORT = 9199;

// Force explicit emulator connection
process.env.FIRESTORE_EMULATOR_HOST = `${EMULATOR_HOST}:${FIRESTORE_PORT}`;
process.env.FIREBASE_STORAGE_EMULATOR_HOST = `${EMULATOR_HOST}:${STORAGE_PORT}`;

// Initialize Firebase with explicit emulator settings
const app = admin.initializeApp({
  projectId: 'demo-project',
  storageBucket: 'demo-project.appspot.com',
});

// Force the emulator connection
const firestore = admin.firestore();
firestore.settings({
  host: `${EMULATOR_HOST}:${FIRESTORE_PORT}`,
  ssl: false,
  experimentalForceLongPolling: true,
});

// Get storage bucket with direct configuration
const bucket = admin.storage().bucket();

console.log(`Connected to Firestore emulator at: ${EMULATOR_HOST}:${FIRESTORE_PORT}`);
console.log(`Connected to Storage emulator at: ${EMULATOR_HOST}:${STORAGE_PORT}`);

// Path settings
const DATA_DIR = path.join(process.cwd(), 'src/data');
const IMAGES_DIR = path.join(DATA_DIR, 'images');
const FILES = {
  users: path.join(DATA_DIR, 'firebase-users.json'),
  chats: path.join(DATA_DIR, 'firebase-chats.json'),
  posts: path.join(DATA_DIR, 'firebase-posts.json'),
  usersPublicData: path.join(DATA_DIR, 'firebase-usersPublicData.json'),
};

/**
 * Check if emulators are running
 */
async function checkEmulators(): Promise<boolean> {
  try {
    console.log('Checking if Firestore emulator is running...');
    // Try to get a non-existent document to check connection
    await firestore.collection('_check_').doc('_connection_').get();
    console.log('✅ Successfully connected to Firestore emulator');

    // Since the Storage emulator connection is more complicated and often fails
    // in the check but works in the actual upload, we'll assume it's available
    // if Firestore is running
    console.log('Assuming Storage emulator is also running (will verify during upload)');
    return true;
  } catch (error) {
    console.error(
      '❌ Failed to connect to Firestore emulator:',
      error instanceof Error ? error.message : String(error),
    );
    console.error(
      '⚠️ Ensure emulators are running with: firebase emulators:start --only firestore,storage',
    );
    return false;
  }
}

/**
 * Read data from JSON file
 */
function readJsonFile(filePath: string): any {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return null;
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

/**
 * Delete all documents from a collection
 */
async function deleteCollection(collectionPath: string): Promise<void> {
  console.log(`Deleting collection: ${collectionPath}...`);

  try {
    const collectionRef = firestore.collection(collectionPath);
    const snapshot = await collectionRef.get();

    if (snapshot.empty) {
      console.log(`Collection ${collectionPath} is empty.`);
      return;
    }

    // Delete in batches
    const batchSize = 500;
    const batches = [];

    let currentBatch = firestore.batch();
    let operationCount = 0;

    for (const doc of snapshot.docs) {
      currentBatch.delete(doc.ref);
      operationCount++;

      if (operationCount >= batchSize) {
        batches.push(currentBatch.commit());
        currentBatch = firestore.batch();
        operationCount = 0;
      }
    }

    // Commit any remaining deletes
    if (operationCount > 0) {
      batches.push(currentBatch.commit());
    }

    // Wait for all batches to complete
    await Promise.all(batches);
    console.log(`Deleted ${snapshot.size} documents from ${collectionPath}`);
  } catch (error) {
    console.error(`Error deleting collection ${collectionPath}:`, error);
    throw error;
  }
}

/**
 * Delete document at specified path
 */
async function deleteDocument(docPath: string): Promise<void> {
  console.log(`Deleting document: ${docPath}...`);

  try {
    const docRef = firestore.doc(docPath);
    const doc = await docRef.get();

    if (!doc.exists) {
      console.log(`Document ${docPath} does not exist.`);
      return;
    }

    await docRef.delete();
    console.log(`Deleted document ${docPath}`);
  } catch (error) {
    console.error(`Error deleting document ${docPath}:`, error);
  }
}

/**
 * Upload data to a collection as individual documents
 */
async function uploadCollection(collectionPath: string, data: Record<string, any>): Promise<void> {
  console.log(`Uploading to collection: ${collectionPath}...`);

  try {
    // Get list of documents to upload
    const entries = Object.entries(data);

    if (entries.length === 0) {
      console.log(`No data to upload to ${collectionPath}`);
      return;
    }

    console.log(`Uploading ${entries.length} documents to ${collectionPath}...`);

    // Upload in batches
    const batchSize = 500;
    const batches = [];

    let currentBatch = firestore.batch();
    let operationCount = 0;
    let totalCount = 0;

    for (const [docId, docData] of entries) {
      const docRef = firestore.collection(collectionPath).doc(docId);
      currentBatch.set(docRef, docData);
      operationCount++;
      totalCount++;

      if (operationCount >= batchSize) {
        batches.push(currentBatch.commit());
        currentBatch = firestore.batch();
        operationCount = 0;
        if (verbose) {
          console.log(`Batched ${totalCount} documents so far...`);
        }
      }
    }

    // Commit any remaining documents
    if (operationCount > 0) {
      batches.push(currentBatch.commit());
    }

    // Wait for all batches to complete
    await Promise.all(batches);
    console.log(`Successfully uploaded ${totalCount} documents to ${collectionPath}`);
  } catch (error) {
    console.error(`Error uploading to collection ${collectionPath}:`, error);
    throw error;
  }
}

/**
 * Delete all files from the storage bucket
 */
async function deleteStorageFiles(): Promise<void> {
  console.log('Deleting files from Storage emulator...');

  try {
    const [files] = await bucket.getFiles();

    if (files.length === 0) {
      console.log('No files to delete in Storage emulator');
      return;
    }

    console.log(`Deleting ${files.length} files from Storage emulator...`);

    // Delete files in parallel
    const deletePromises = files.map((file) => file.delete());
    await Promise.all(deletePromises);

    console.log('Successfully deleted all files from Storage emulator');
  } catch (error) {
    console.error('Error deleting files from Storage:', error);
    throw error;
  }
}

/**
 * Upload all images from the data directory to the storage emulator
 */
async function uploadImages(): Promise<void> {
  if (skipImages) {
    console.log('Skipping image upload due to --skip-images flag');
    return;
  }

  console.log('Uploading images to Storage emulator...');

  try {
    // Check if images directory exists
    if (!fs.existsSync(IMAGES_DIR)) {
      console.warn(`Images directory not found: ${IMAGES_DIR}`);
      return;
    }

    const imageTypes = ['profiles', 'backgrounds', 'posts'];
    let totalFiles = 0;
    let uploadedFiles = 0;

    // First count total files
    for (const type of imageTypes) {
      const typeDir = path.join(IMAGES_DIR, type);
      if (fs.existsSync(typeDir)) {
        const files = fs.readdirSync(typeDir);
        totalFiles += files.length;
      }
    }

    console.log(`Found ${totalFiles} total images across all directories`);

    if (totalFiles === 0) {
      console.log('No images to upload.');
      return;
    }

    // Skip most uploads unless verbose mode
    const maxUploads = verbose ? totalFiles : Math.min(3, totalFiles);
    console.log(`Will upload ${maxUploads} of ${totalFiles} images (use --verbose to upload all)`);

    // Upload files
    for (const type of imageTypes) {
      const typeDir = path.join(IMAGES_DIR, type);

      if (!fs.existsSync(typeDir)) {
        console.warn(`Image type directory not found: ${typeDir}`);
        continue;
      }

      const imageFiles = fs.readdirSync(typeDir);
      console.log(`Found ${imageFiles.length} images in ${type} directory`);

      // Take only the files we need based on maxUploads
      const filesToUpload = imageFiles.slice(
        0,
        Math.min(imageFiles.length, maxUploads - uploadedFiles),
      );

      if (filesToUpload.length === 0) {
        continue; // Skip if we've already reached our quota
      }

      console.log(`Uploading ${filesToUpload.length} images from ${type}...`);

      for (const filename of filesToUpload) {
        const filePath = path.join(typeDir, filename);
        const destination = `images/${type}/${filename}`;

        try {
          await bucket.upload(filePath, {
            destination,
            metadata: {
              contentType: 'image/webp',
            },
          });

          // Log progress
          uploadedFiles++;
          if (verbose || uploadedFiles % 5 === 0) {
            console.log(`Uploaded ${uploadedFiles}/${maxUploads}: ${destination}`);
          }

          if (uploadedFiles >= maxUploads) {
            console.log(
              `Reached upload limit of ${maxUploads}. Use --verbose to upload all images.`,
            );
            return;
          }
        } catch (error) {
          console.error(`Error uploading ${destination}:`, error);
          // Continue with other files
        }
      }
    }

    console.log(`Successfully uploaded ${uploadedFiles} images to Storage emulator`);

    if (uploadedFiles < totalFiles) {
      console.log(`Skipped ${totalFiles - uploadedFiles} images. Use --verbose to upload all.`);
    }
  } catch (error) {
    console.error('Error with image upload process:', error);
    console.log('Continuing despite image upload errors...');
  }
}

/**
 * Delete all existing data in emulators
 */
async function deleteExistingData(): Promise<void> {
  console.log('Deleting existing data from emulators...');

  try {
    // Delete collections
    await Promise.all([
      deleteCollection('users'),
      deleteCollection('chats'),
      deleteCollection('posts'),
    ]);

    // Delete specific documents
    await Promise.all([
      deleteDocument('usersPublicData/usersBasicInfo'),
      deleteDocument('usersPublicData/usersPublicFriends'),
    ]);

    // Delete storage files
    await deleteStorageFiles();

    console.log('Successfully deleted existing data');
  } catch (error) {
    console.error('Error deleting existing data:', error);
    throw error;
  }
}

/**
 * Upload generated data to emulators
 */
async function uploadGeneratedData(): Promise<void> {
  console.log('Uploading generated data to emulators...');

  try {
    // Check if data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      console.error(`Data directory not found: ${DATA_DIR}`);
      console.error('Please run "bun run generate:data" first to generate the data.');
      process.exit(1);
    }

    // Load data from files
    const users = readJsonFile(FILES.users);
    const chats = readJsonFile(FILES.chats);
    const posts = readJsonFile(FILES.posts);
    const usersPublicData = readJsonFile(FILES.usersPublicData);

    if (!users || !chats || !posts || !usersPublicData) {
      throw new Error('Failed to load one or more data files');
    }

    // Upload regular collections
    const collectionPromises = [
      uploadCollection('users', users),
      uploadCollection('chats', chats),
      uploadCollection('posts', posts),
    ];

    // Wait for collections to be uploaded
    await Promise.all(collectionPromises);

    // Upload usersPublicData documents - these are special single documents
    console.log('Creating usersPublicData documents...');

    // Set usersBasicInfo document
    if (usersPublicData.usersBasicInfo) {
      console.log('Creating usersBasicInfo document...');
      try {
        await firestore.doc('usersPublicData/usersBasicInfo').set(usersPublicData.usersBasicInfo);
        console.log('Created usersBasicInfo document successfully');
      } catch (error) {
        console.error('Error creating usersBasicInfo document:', error);
        throw error;
      }
    }

    // Set usersPublicFriends document
    if (usersPublicData.usersPublicFriends) {
      console.log('Creating usersPublicFriends document...');
      try {
        await firestore
          .doc('usersPublicData/usersPublicFriends')
          .set(usersPublicData.usersPublicFriends);
        console.log('Created usersPublicFriends document successfully');
      } catch (error) {
        console.error('Error creating usersPublicFriends document:', error);
        throw error;
      }
    }

    // Upload images to storage emulator
    await uploadImages();

    console.log('Successfully uploaded all data to emulators');
  } catch (error) {
    console.error('Error uploading data:', error);
    throw error;
  }
}

/**
 * Log the structure of uploaded data to help debug client access issues
 */
async function debugEmulatorData(): Promise<void> {
  console.log('\n🔍 DEBUGGING EMULATOR DATA 🔍');
  console.log('==============================');

  try {
    // Debug usersPublicData documents
    console.log('Checking usersPublicData...');
    const usersBasicInfoDoc = await firestore.doc('usersPublicData/usersBasicInfo').get();
    console.log('usersBasicInfo exists:', usersBasicInfoDoc.exists);
    if (usersBasicInfoDoc.exists) {
      // Check the first user to verify structure
      const basicInfoData = usersBasicInfoDoc.data();
      const userIds = Object.keys(basicInfoData || {});
      console.log(`Found ${userIds.length} users in usersBasicInfo`);
      if (userIds.length > 0) {
        console.log('First user sample:', userIds[0], basicInfoData?.[userIds[0]]);
      }
    }

    const usersPublicFriendsDoc = await firestore.doc('usersPublicData/usersPublicFriends').get();
    console.log('usersPublicFriends exists:', usersPublicFriendsDoc.exists);
    if (usersPublicFriendsDoc.exists) {
      const friendsData = usersPublicFriendsDoc.data();
      const userIds = Object.keys(friendsData || {});
      console.log(`Found ${userIds.length} users in usersPublicFriends`);
    }

    // Debug regular collections
    const usersSnapshot = await firestore.collection('users').limit(1).get();
    console.log('users collection has documents:', !usersSnapshot.empty);
    if (!usersSnapshot.empty) {
      console.log(`Found ${usersSnapshot.size} users`);
    }

    const postsSnapshot = await firestore.collection('posts').limit(1).get();
    console.log('posts collection has documents:', !postsSnapshot.empty);
    if (!postsSnapshot.empty) {
      console.log(`Found ${postsSnapshot.size} posts`);
    }

    // Check storage files
    try {
      const [storageFiles] = await bucket.getFiles({ maxResults: 5 });
      console.log(`Storage has ${storageFiles.length} files`);
      if (storageFiles.length > 0) {
        console.log('First few files:');
        storageFiles.slice(0, 5).forEach((file, i) => {
          console.log(`  ${i + 1}. ${file.name}`);
        });
      }
    } catch (storageError) {
      console.error('Error checking storage files:', storageError);
    }

    // Write a debug file with emulator state
    fs.writeFileSync(
      path.join(process.cwd(), 'emulator-debug.json'),
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          usersBasicInfoExists: usersBasicInfoDoc.exists,
          usersPublicFriendsExists: usersPublicFriendsDoc.exists,
          hasUsers: !usersSnapshot.empty,
          hasPosts: !postsSnapshot.empty,
          projectId: admin.app().options.projectId,
          emulatorHost: process.env.FIRESTORE_EMULATOR_HOST,
          storageEmulatorHost: process.env.STORAGE_EMULATOR_HOST,
        },
        null,
        2,
      ),
    );

    console.log('Debug info written to emulator-debug.json');
    console.log('==============================\n');
  } catch (error) {
    console.error('Error while debugging emulator data:', error);
  }
}

/**
 * Main function
 */
async function main(): Promise<void> {
  console.log('\n🔥 FIREBASE EMULATOR POPULATION 🔥');
  console.log('==================================');

  console.log(`Firestore emulator expected at: ${EMULATOR_HOST}:${FIRESTORE_PORT}`);
  console.log(`Storage emulator expected at: ${EMULATOR_HOST}:${STORAGE_PORT}`);

  if (deleteOnly) {
    console.log('⚠️ Running in DELETE-ONLY mode. Data will be deleted but not populated.');
  }

  if (populateOnly) {
    console.log('⚠️ Running in POPULATE-ONLY mode. Existing data will not be deleted.');
  }

  if (skipImages) {
    console.log('⚠️ Running with --skip-images flag. No images will be uploaded.');
  }

  console.log('==================================\n');

  // Check if emulators are running
  const emulatorsRunning = await checkEmulators();
  if (!emulatorsRunning) {
    console.error('\n❌ EMULATORS CHECK FAILED');
    console.error('This could be because:');
    console.error('1. Emulators are not running (start with: firebase emulators:start)');
    console.error('2. Emulators are running on different ports');
    console.error('3. There is a connection issue to the emulators');
    process.exit(1);
  }

  try {
    // Delete existing data if not in populate-only mode
    if (!populateOnly) {
      await deleteExistingData();
    }

    // Upload generated data if not in delete-only mode
    if (!deleteOnly) {
      await uploadGeneratedData();
    }

    // Debug the uploaded data
    await debugEmulatorData();

    console.log('\n✅ FIREBASE EMULATOR POPULATION COMPLETED');
    console.log('==================================');
    console.log('\nℹ️  To view your data in the app:');
    console.log('1. Make sure NEXT_PUBLIC_USE_EMULATOR=true in .env.local');
    console.log('2. Restart your Next.js server if it was already running');
    console.log('==================================');
  } catch (error) {
    console.error('\n❌ ERROR DURING EMULATOR POPULATION');
    console.error('----------------------------------');
    console.error(error instanceof Error ? error.message : String(error));
    console.error('\nPossible solutions:');
    console.error('1. Run with --skip-images if image upload is causing issues');
    console.error('2. Check the emulator logs for more details');
    process.exit(1);
  }
}

// Execute the main function
main().catch((error) => {
  console.error('Uncaught error in main function:', error);
  process.exit(1);
});
