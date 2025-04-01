import admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import { firebaseConfig } from '../../config/env';

// Parse CLI arguments
const deleteOnly = process.argv.includes('--delete-only');
const populateOnly = process.argv.includes('--populate-only');
const skipImages = process.argv.includes('--skip-images');

// Local emulator host settings
const EMULATOR_HOST = 'localhost';
const FIRESTORE_PORT = 8080;
const STORAGE_PORT = 9199;

// Force explicit emulator connection
process.env.FIRESTORE_EMULATOR_HOST = `${EMULATOR_HOST}:${FIRESTORE_PORT}`;
process.env.FIREBASE_STORAGE_EMULATOR_HOST = `${EMULATOR_HOST}:${STORAGE_PORT}`;

// Initialize Firebase with explicit emulator settings
const app = admin.initializeApp({
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
});

// Force the emulator connection
const firestore = admin.firestore();
firestore.settings({
  host: `${EMULATOR_HOST}:${FIRESTORE_PORT}`,
  ssl: false,
});

// Get storage bucket with direct configuration
const bucket = admin.storage().bucket();

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
    console.log('Checking Firestore emulator connection...');
    await firestore.collection('_check_').doc('_connection_').get();
    console.log('✅ Connected to Firestore emulator');
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

    // Upload in smaller batches with rate limiting
    const batchSize = 50; // Reduced from 500 to 50
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
      }
    }

    // Commit any remaining documents
    if (operationCount > 0) {
      batches.push(currentBatch.commit());
    }

    // Process batches with rate limiting
    for (const batch of batches) {
      try {
        await batch;
        // Add a small delay between batches to prevent overwhelming the emulator
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error processing batch for ${collectionPath}:`, error);
        throw error;
      }
    }

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
    console.log(`Attempting to connect to Storage emulator at ${EMULATOR_HOST}:${STORAGE_PORT}`);
    console.log(`Using bucket: ${firebaseConfig.storageBucket}`);

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
    console.log('⚠️ Continuing despite Storage error...');
    // Don't rethrow, allow the process to continue
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

    // Upload all files
    for (const type of imageTypes) {
      const typeDir = path.join(IMAGES_DIR, type);

      if (!fs.existsSync(typeDir)) {
        console.warn(`Image type directory not found: ${typeDir}`);
        continue;
      }

      const imageFiles = fs.readdirSync(typeDir);
      console.log(`Uploading ${imageFiles.length} images from ${type}...`);

      for (const filename of imageFiles) {
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
          if (uploadedFiles % 10 === 0) {
            console.log(`Uploaded ${uploadedFiles}/${totalFiles}: ${destination}`);
          }
        } catch (error) {
          console.error(`Error uploading ${destination}:`, error);
          // Continue with other files
        }
      }
    }

    console.log(`Successfully uploaded ${uploadedFiles} images to Storage emulator`);
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

    // Upload usersPublicData documents
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
 * Main function
 */
async function main(): Promise<void> {
  console.log('\n🔥 FIREBASE EMULATOR POPULATION 🔥');
  console.log('==================================');

  if (deleteOnly) {
    console.log('⚠️ Running in DELETE-ONLY mode');
  }

  if (populateOnly) {
    console.log('⚠️ Running in POPULATE-ONLY mode');
  }

  if (skipImages) {
    console.log('⚠️ Running with --skip-images flag');
  }

  console.log('==================================\n');

  // Check if emulators are running
  const emulatorsRunning = await checkEmulators();
  if (!emulatorsRunning) {
    console.error('\n❌ EMULATORS NOT CONNECTED');
    console.error('1. Start emulators: firebase emulators:start --only firestore,storage');
    console.error('2. Check port configuration: Firestore=8080, Storage=9199');
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

    console.log('\n✅ FIREBASE EMULATOR POPULATION COMPLETED');
    console.log('==================================');
    console.log('To use the client using emulators, run:');
    console.log('bun run dev:local');
    console.log('==================================');
  } catch (error) {
    console.error('\n❌ ERROR DURING EMULATOR POPULATION');
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// Execute the main function
main().catch((error) => {
  console.error('Uncaught error:', error);
  process.exit(1);
});
