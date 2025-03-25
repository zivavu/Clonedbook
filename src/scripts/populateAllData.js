#!/usr/bin/env node

/**
 * Unified Data Population Script
 *
 * This script populates all required data sources for local development:
 * - Firebase Firestore
 * - Firebase Storage
 * - Algolia (if used in the application)
 *
 * It provides good reliability and performance with timeout handling and retry logic.
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Constants for reliability and performance
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;
const BATCH_SIZE = 150;
const DELAY_BETWEEN_BATCHES_MS = 300;
const DELAY_BETWEEN_COLLECTIONS_MS = 1000;
const CONNECTION_TIMEOUT_MS = 10000;

// Print with timestamp
function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

// Set environment variables BEFORE initializing Firebase
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
process.env.FIREBASE_STORAGE_EMULATOR_HOST = 'localhost:9199';

log('🚀 Starting unified data population script');
log('This script will populate Firestore, Storage, and Algolia data');

// Initialize Firebase Admin with explicit projectId
const app = admin.initializeApp({
  projectId: 'demo-project',
});

// Retry function with exponential backoff
async function withRetry(operation, operationName, maxRetries = MAX_RETRIES) {
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      if (attempt > 0) {
        const delay = RETRY_DELAY_MS * Math.pow(1.5, attempt - 1);
        log(
          `⏳ Retry attempt ${attempt}/${maxRetries} for ${operationName}. Waiting ${delay / 1000} seconds...`,
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      return await operation();
    } catch (error) {
      attempt++;
      const isLastAttempt = attempt > maxRetries;

      if (error.message.includes('Connection reset') || error.code === 'ECONNRESET') {
        log(`⚠️ Connection reset during ${operationName} (attempt ${attempt}/${maxRetries + 1})`);
      } else {
        log(
          `⚠️ Error during ${operationName} (attempt ${attempt}/${maxRetries + 1}): ${error.message}`,
        );
      }

      if (isLastAttempt) {
        log(`❌ Failed to complete ${operationName} after ${maxRetries + 1} attempts`);
        throw error;
      }
    }
  }
}

// Check if emulators are running
async function checkEmulatorsConnection() {
  // Check Firebase connection with timeout
  const checkFirestore = new Promise(async (resolve) => {
    try {
      log('🔍 Checking Firestore emulator connection...');
      const db = app.firestore();
      await db.collection('connection-test').doc('test').set({
        timestamp: new Date().toISOString(),
      });
      log('✅ Successfully connected to Firestore emulator');
      resolve(true);
    } catch (error) {
      log(`❌ Failed to connect to Firestore emulator: ${error.message}`);
      resolve(false);
    }
  });

  // Check Storage connection with timeout
  const checkStorage = new Promise(async (resolve) => {
    try {
      log('🔍 Checking Storage emulator connection...');
      const bucket = admin.storage().bucket('demo-project.appspot.com');
      await bucket.file('test-file.txt').save('test data');
      log('✅ Successfully connected to Storage emulator');
      resolve(true);
    } catch (error) {
      log(`❌ Failed to connect to Storage emulator: ${error.message}`);
      resolve(false);
    }
  });

  // Add timeouts
  const timeoutPromise = new Promise((resolve) => {
    setTimeout(() => {
      log('⏱️ Connection check timed out');
      resolve(false);
    }, CONNECTION_TIMEOUT_MS);
  });

  // Race against timeout
  const firestoreConnected = await Promise.race([checkFirestore, timeoutPromise]);
  const storageConnected = await Promise.race([checkStorage, timeoutPromise]);

  return firestoreConnected && storageConnected;
}

// Populate Firestore with data
async function populateFirestore() {
  log('\n==== POPULATING FIRESTORE ====');

  // Read the data file
  const dataFilePath = path.join(process.cwd(), 'src/local/data/firebase-data.json');

  log(`📂 Reading data from ${dataFilePath}...`);
  if (!fs.existsSync(dataFilePath)) {
    log(`❌ Data file not found at ${dataFilePath}`);
    log('   Please run: bun run generate:data');
    return false;
  }

  let data;
  try {
    const rawData = fs.readFileSync(dataFilePath, 'utf8');
    data = JSON.parse(rawData);
    log('✅ Successfully parsed data file');
  } catch (error) {
    log(`❌ Failed to parse data file: ${error.message}`);
    return false;
  }

  // Get Firestore instance
  const db = app.firestore();

  // Collections to populate
  const collections = [
    'users',
    'posts',
    'chats',
    'userBasicInfo',
    'userPublicFriends',
    'comments',
    'reactions',
  ];

  // Clear each collection
  log('🧹 Clearing existing data...');
  for (const collection of collections) {
    try {
      // Check if collection has data
      const snapshot = await db.collection(collection).limit(1).get();
      const isEmpty = snapshot.empty;

      if (isEmpty) {
        log(`ℹ️ Collection '${collection}' is already empty`);
        continue;
      }

      // Get all document ids
      const allDocs = await db.collection(collection).get();
      log(`🧹 Clearing ${allDocs.size} documents from collection '${collection}'...`);

      // Delete in batches
      const batches = [];
      let batch = db.batch();
      let operationCount = 0;

      for (const doc of allDocs.docs) {
        batch.delete(doc.ref);
        operationCount++;

        if (operationCount === BATCH_SIZE) {
          batches.push(batch);
          batch = db.batch();
          operationCount = 0;
        }
      }

      if (operationCount > 0) {
        batches.push(batch);
      }

      // Process each batch with delay between them
      for (let i = 0; i < batches.length; i++) {
        await withRetry(
          async () => {
            await batches[i].commit();
          },
          `clear batch ${i + 1}/${batches.length} for collection ${collection}`,
        );

        // Add delay between batches
        if (i < batches.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_BATCHES_MS));
        }
      }

      log(`✅ Successfully cleared collection '${collection}'`);
    } catch (error) {
      log(`⚠️ Error clearing collection '${collection}': ${error.message}`);
      log('   Continuing with population...');
    }
  }

  // Populate each collection
  for (const collection of collections) {
    log(`\n📥 Processing collection: '${collection}'...`);

    // Skip if collection doesn't exist in the data file
    if (!data[collection]) {
      log(`ℹ️ No data found for collection '${collection}' in the data file. Skipping.`);
      continue;
    }

    // Process the documents in batches
    const documents = data[collection];
    const documentIds = Object.keys(documents);
    const totalDocuments = documentIds.length;

    log(`⏳ Preparing to write ${totalDocuments} documents to collection '${collection}'...`);

    // Create batches
    const batches = [];
    let batch = db.batch();
    let operationCount = 0;

    for (const docId of documentIds) {
      const docRef = db.collection(collection).doc(docId);
      const docData = documents[docId];

      // Process data to ensure it's compatible with Firestore
      const processedData = JSON.parse(JSON.stringify(docData));

      batch.set(docRef, processedData);
      operationCount++;

      if (operationCount === BATCH_SIZE) {
        batches.push(batch);
        batch = db.batch();
        operationCount = 0;
      }
    }

    if (operationCount > 0) {
      batches.push(batch);
    }

    // Process each batch with delay between them
    for (let i = 0; i < batches.length; i++) {
      log(`⏳ Committing batch ${i + 1}/${batches.length} for collection '${collection}'...`);

      await withRetry(
        async () => {
          await batches[i].commit();
        },
        `commit batch ${i + 1}/${batches.length} for collection ${collection}`,
      );

      // Progress report
      const docsWritten = Math.min((i + 1) * BATCH_SIZE, totalDocuments);
      const percentComplete = Math.floor((docsWritten / totalDocuments) * 100);
      log(`📊 Progress: ${docsWritten}/${totalDocuments} documents (${percentComplete}%)`);

      // Add delay between batches
      if (i < batches.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_BATCHES_MS));
      }
    }

    log(`✅ Successfully populated collection '${collection}' with ${totalDocuments} documents`);

    // Add delay between collections
    if (collections.indexOf(collection) < collections.length - 1) {
      log(`⏳ Waiting before processing next collection...`);
      await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_COLLECTIONS_MS));
    }
  }

  log('✅ Firestore population completed successfully');
  return true;
}

// Populate Storage with images
async function populateStorage() {
  log('\n==== POPULATING STORAGE ====');

  try {
    // Check for profile images directory
    const profileImagesDir = path.join(process.cwd(), 'src/local/data/profile-images');

    if (!fs.existsSync(profileImagesDir)) {
      log(`❌ Profile images directory not found at ${profileImagesDir}`);
      log('   Please run: bun run generate:data');
      return false;
    }

    log(`📂 Looking for profile images in ${profileImagesDir}...`);

    // Get list of profile images
    const imageFiles = fs
      .readdirSync(profileImagesDir)
      .filter((file) => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg'));

    if (imageFiles.length === 0) {
      log('❌ No image files found in profile images directory');
      return false;
    }

    log(`📤 Found ${imageFiles.length} images to upload`);

    // Get bucket
    const bucket = admin.storage().bucket('demo-project.appspot.com');

    // Upload images
    for (let i = 0; i < imageFiles.length; i++) {
      const imageFile = imageFiles[i];
      const imagePath = path.join(profileImagesDir, imageFile);
      const destination = `profile-images/${imageFile}`;

      try {
        await withRetry(
          async () => {
            await bucket.upload(imagePath, {
              destination,
              metadata: {
                contentType: imageFile.endsWith('.png') ? 'image/png' : 'image/jpeg',
              },
            });
          },
          `upload image ${i + 1}/${imageFiles.length}`,
        );

        log(`✅ Uploaded ${imageFile} (${i + 1}/${imageFiles.length})`);
      } catch (error) {
        log(`❌ Failed to upload ${imageFile}: ${error.message}`);
      }

      // Add a small delay between uploads
      if (i < imageFiles.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    }

    log('✅ Storage population completed successfully');
    return true;
  } catch (error) {
    log(`❌ Error during storage population: ${error.message}`);
    return false;
  }
}

// Populate Algolia (if used)
async function populateAlgolia() {
  log('\n==== CHECKING FOR ALGOLIA DATA ====');

  try {
    // Check if Algolia config exists
    const algoliaConfigPath = path.join(process.cwd(), 'src/config/algolia.config.ts');

    if (!fs.existsSync(algoliaConfigPath)) {
      log('ℹ️ No Algolia configuration found, skipping Algolia population');
      return true;
    }

    log('ℹ️ Algolia configuration detected');
    log('ℹ️ For local development, Algolia is not typically emulated');
    log('ℹ️ You would need to populate a real Algolia index for search functionality');
    log('ℹ️ Consider using a development index for this purpose');

    // Here you could implement Algolia population if needed

    return true;
  } catch (error) {
    log(`❌ Error checking Algolia config: ${error.message}`);
    return true; // Not critical, so return true anyway
  }
}

// Main function to run the population process
async function populateAllData() {
  log('🔎 Checking if emulators are running...');

  const emulatorsRunning = await checkEmulatorsConnection();
  if (!emulatorsRunning) {
    log('❌ Could not connect to emulators');
    log(
      '📌 Make sure the emulators are running with: firebase emulators:start --project=demo-project',
    );
    process.exit(1);
  }

  let success = true;

  // Populate Firestore
  const firestoreSuccess = await populateFirestore();
  success = success && firestoreSuccess;

  // Populate Storage
  const storageSuccess = await populateStorage();
  success = success && storageSuccess;

  // Check for Algolia
  const algoliaSuccess = await populateAlgolia();
  success = success && algoliaSuccess;

  if (success) {
    log('\n🎉 All data population completed successfully!');
    log('\n📌 Next steps:');
    log('1. Export the emulator data for future use:');
    log('   firebase emulators:export ./firebase-emulator-data');
    log('2. Restart the emulators with the imported data:');
    log('   firebase emulators:start --project=demo-project --import=./firebase-emulator-data');
    log('3. Start your application:');
    log('   bun run dev:local');
  } else {
    log('\n⚠️ Some parts of data population failed');
    log('📌 Check the logs above for details');
  }
}

// Run the population
populateAllData().catch((error) => {
  log(`❌ Fatal error: ${error.message}`);
  log('Stack trace:');
  log(error.stack);
  process.exit(1);
});
