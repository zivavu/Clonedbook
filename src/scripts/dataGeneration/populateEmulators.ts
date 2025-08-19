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

// Recursively convert any {seconds, nanoseconds} shaped objects into Firestore Timestamps
function convertTimestampsDeep<T = any>(value: T): T {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) return value.map((v) => convertTimestampsDeep(v)) as unknown as T;
  if (typeof value === 'object') {
    const obj = value as Record<string, any>;
    // Detect timestamp-like object
    if (
      typeof obj.seconds === 'number' &&
      typeof obj.nanoseconds === 'number' &&
      Object.keys(obj).length === 2
    ) {
      const millis = obj.seconds * 1000 + Math.floor(obj.nanoseconds / 1_000_000);
      return admin.firestore.Timestamp.fromMillis(millis) as unknown as T;
    }
    // Recurse for maps
    const converted: Record<string, any> = {};
    for (const [k, v] of Object.entries(obj)) {
      converted[k] = convertTimestampsDeep(v);
    }
    return converted as T;
  }
  return value;
}

// Path settings
const DATA_DIR = path.join(process.cwd(), 'src/data');
const IMAGES_DIR = path.join(DATA_DIR, 'images');
const FILES = {
  users: path.join(DATA_DIR, 'firebase-users.json'),
  chats: path.join(DATA_DIR, 'firebase-chats.json'),
  posts: path.join(DATA_DIR, 'firebase-posts.json'),
  usersPublicData: path.join(DATA_DIR, 'firebase-usersPublicData.json'),
  usersPictures: path.join(DATA_DIR, 'firebase-users-pictures.json'),
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
      currentBatch.set(docRef, convertTimestampsDeep(docData));
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

    // Recursively walk IMAGES_DIR and upload preserving relative paths
    let totalFiles = 0;
    let uploadedFiles = 0;

    const walk = (dir: string, base: string): { abs: string; rel: string }[] => {
      const collected: { abs: string; rel: string }[] = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const absPath = path.join(dir, entry.name);
        const relPath = path.relative(base, absPath).replace(/\\/g, '/');
        if (entry.isDirectory()) {
          collected.push(...walk(absPath, base));
        } else {
          collected.push({ abs: absPath, rel: relPath });
        }
      }
      return collected;
    };

    const filesToUpload = walk(IMAGES_DIR, IMAGES_DIR);
    totalFiles = filesToUpload.length;
    console.log(`Found ${totalFiles} total images`);
    if (totalFiles === 0) return;

    for (const file of filesToUpload) {
      // Convert local images structure to storage root paths:
      // src/data/images/users/<userId>/pictures/<picId>.webp -> users/<userId>/pictures/<picId>.webp
      // src/data/images/posts/<postId>/<picId>.webp        -> posts/<postId>/<picId>.webp
      const parts = file.rel.split('/');
      let destination = '';
      if (parts[0] === 'users') {
        destination = `users/${parts.slice(1).join('/')}`;
      } else if (parts[0] === 'posts') {
        destination = `posts/${parts.slice(1).join('/')}`;
      } else {
        // Skip any unexpected top-level dirs
        continue;
      }

      try {
        await bucket.upload(file.abs, {
          destination,
          metadata: { contentType: 'image/webp' },
        });
        uploadedFiles++;
        if (uploadedFiles % 10 === 0) {
          console.log(`Uploaded ${uploadedFiles}/${totalFiles}: ${destination}`);
        }
      } catch (error) {
        console.error(`Error uploading ${destination}:`, error);
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
    const usersPictures = readJsonFile(FILES.usersPictures);

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
        await firestore
          .doc('usersPublicData/usersBasicInfo')
          .set(convertTimestampsDeep(usersPublicData.usersBasicInfo));
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
          .set(convertTimestampsDeep(usersPublicData.usersPublicFriends));
        console.log('Created usersPublicFriends document successfully');
      } catch (error) {
        console.error('Error creating usersPublicFriends document:', error);
        throw error;
      }
    }

    // Upload images to storage emulator
    await uploadImages();

    // Upload per-user pictures subcollection
    if (usersPictures && typeof usersPictures === 'object') {
      console.log('Uploading users pictures subcollections...');
      for (const [userId, picturesDoc] of Object.entries(usersPictures as Record<string, any>)) {
        const docRef = firestore
          .collection('users')
          .doc(userId)
          .collection('pictures')
          .doc('pictures');
        await docRef.set(convertTimestampsDeep(picturesDoc) as admin.firestore.DocumentData);
      }
      console.log('Uploaded users pictures subcollections');
    }

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
