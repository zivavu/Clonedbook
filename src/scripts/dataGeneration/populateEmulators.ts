import admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Parse CLI arguments
const deleteOnly = process.argv.includes('--delete-only');
const populateOnly = process.argv.includes('--populate-only');
const verbose = process.argv.includes('--verbose');

// Clear any existing Firebase admin apps
try {
  admin.app().delete();
} catch (error) {
  // No existing app to delete
}

// Local emulator host settings
const EMULATOR_HOST = 'localhost';
const FIRESTORE_PORT = 8080;

// Initialize Firebase Admin with emulator settings
process.env.FIRESTORE_EMULATOR_HOST = `${EMULATOR_HOST}:${FIRESTORE_PORT}`;

// This is a critical step for connecting to emulators
admin.initializeApp({
  projectId: 'demo-project',
});

const firestore = admin.firestore();

// Path settings
const DATA_DIR = path.join(process.cwd(), 'src/data');
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
    console.log('Checking if emulators are running...');
    // Try to get a non-existent document to check connection
    await firestore.collection('_check_').doc('_connection_').get();
    console.log('Successfully connected to Firestore emulator');
    return true;
  } catch (error) {
    console.error('Failed to connect to Firestore emulator:', error);
    console.error(`Ensure emulators are running with: bun run emulators`);
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
  console.log('Starting Firebase emulator population...');
  console.log(`Using Firestore emulator at: ${process.env.FIRESTORE_EMULATOR_HOST}`);

  // Check if emulators are running
  const emulatorsRunning = await checkEmulators();
  if (!emulatorsRunning) {
    console.error('Emulators are not running. Please start them with: bun run emulators');
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

    console.log('Firebase emulator population completed successfully!');
    console.log("\nℹ️  If your app still doesn't see the data, check:");
    console.log('1. Your app is using the CORRECT PROJECT ID in both places');
    console.log('2. Your app has NEXT_PUBLIC_USE_EMULATOR=true in .env.local');
    console.log('3. You might need to RESTART your Next.js development server');
  } catch (error) {
    console.error('Error during emulator population:', error);
    process.exit(1);
  } finally {
    // Clean up Firebase Admin connection
    await admin.app().delete();
  }
}

// Execute the main function
main();
