/**
 * Script to clear all data from the Firestore emulator
 * Usage: node clear-firestore.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

console.log(`${colors.magenta}====== Firestore Emulator Data Cleanup ======${colors.reset}\n`);

// Check if emulator is running
async function checkEmulatorRunning() {
  return new Promise((resolve) => {
    http
      .get('http://localhost:8081/', (res) => {
        if (res.statusCode === 200) {
          console.log(
            `${colors.green}✅ Firestore emulator is running on port 8081${colors.reset}`,
          );
          resolve(true);
        } else {
          console.log(
            `${colors.red}❌ Firestore emulator returned status ${res.statusCode}${colors.reset}`,
          );
          resolve(false);
        }
      })
      .on('error', (err) => {
        console.log(
          `${colors.red}❌ Firestore emulator is not running: ${err.message}${colors.reset}`,
        );
        console.log(
          `${colors.yellow}Please start the emulator with: firebase emulators:start${colors.reset}`,
        );
        resolve(false);
      });
  });
}

async function main() {
  // Check if emulator is running
  const emulatorRunning = await checkEmulatorRunning();
  if (!emulatorRunning) {
    console.error(
      `${colors.red}Please start the Firebase emulator before running this script${colors.reset}`,
    );
    process.exit(1);
  }

  try {
    // Import Firebase modules
    const { initializeApp } = await import('firebase/app');
    const {
      getFirestore,
      connectFirestoreEmulator,
      collection,
      getDocs,
      doc,
      deleteDoc,
      writeBatch,
    } = await import('firebase/firestore');

    // Initialize Firebase with a dummy config (we'll use emulator)
    const firebaseConfig = {
      apiKey: 'demo-api-key',
      authDomain: 'demo-clonedbook.firebaseapp.com',
      projectId: 'demo-clonedbook',
      storageBucket: 'demo-clonedbook.appspot.com',
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log(`${colors.green}Firebase initialized successfully${colors.reset}`);

    // Get Firestore and connect to emulator
    const db = getFirestore(app);
    connectFirestoreEmulator(db, 'localhost', 8081);
    console.log(`${colors.green}Connected to Firestore emulator on localhost:8081${colors.reset}`);

    // Read data from src/data to know what collections to check
    const dataFilePath = path.join(process.cwd(), 'src', 'data', 'firebase-data.json');
    let collections = [];
    if (fs.existsSync(dataFilePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
        collections = Object.keys(data);
        console.log(
          `${colors.blue}Found ${collections.length} collections in data file${colors.reset}`,
        );
      } catch (error) {
        console.log(`${colors.yellow}Error reading data file: ${error.message}${colors.reset}`);
        console.log(`${colors.yellow}Will try to discover collections directly${colors.reset}`);
      }
    } else {
      console.log(`${colors.yellow}No data file found at ${dataFilePath}${colors.reset}`);
      console.log(`${colors.yellow}Will try to discover collections directly${colors.reset}`);
    }

    // If no collections found from data file, try these common ones
    if (collections.length === 0) {
      collections = [
        'users',
        'posts',
        'comments',
        'chats',
        'messages',
        'notifications',
        'friendships',
        'reactions',
      ];
      console.log(
        `${colors.yellow}Using default collection list: ${collections.join(', ')}${colors.reset}`,
      );
    }

    // Function to clear a specific collection
    async function clearCollection(collectionName) {
      console.log(`${colors.cyan}Clearing collection: ${collectionName}${colors.reset}`);

      try {
        const querySnapshot = await getDocs(collection(db, collectionName));

        if (querySnapshot.empty) {
          console.log(
            `${colors.yellow}Collection ${collectionName} is already empty${colors.reset}`,
          );
          return 0;
        }

        const BATCH_SIZE = 450; // Firestore batch limit is 500
        let deletedCount = 0;
        let batch = writeBatch(db);
        let batchSize = 0;

        for (const document of querySnapshot.docs) {
          batch.delete(document.ref);
          batchSize++;
          deletedCount++;

          // Commit batch when it reaches the size limit
          if (batchSize >= BATCH_SIZE) {
            await batch.commit();
            console.log(
              `${colors.green}✓ Deleted batch of ${batchSize} documents from ${collectionName}${colors.reset}`,
            );
            batch = writeBatch(db);
            batchSize = 0;
            // Small delay to prevent overwhelming the emulator
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        }

        // Commit any remaining documents
        if (batchSize > 0) {
          await batch.commit();
          console.log(
            `${colors.green}✓ Deleted final batch of ${batchSize} documents from ${collectionName}${colors.reset}`,
          );
        }

        console.log(
          `${colors.green}✓ Deleted all ${deletedCount} documents from ${collectionName}${colors.reset}`,
        );
        return deletedCount;
      } catch (error) {
        console.error(
          `${colors.red}✗ Error clearing collection ${collectionName}: ${error.message}${colors.reset}`,
        );
        return 0;
      }
    }

    // Clear all collections
    let totalDeleted = 0;
    for (const collectionName of collections) {
      const deleted = await clearCollection(collectionName);
      totalDeleted += deleted;
    }

    console.log(`\n${colors.magenta}====== Cleanup Summary ======${colors.reset}`);
    console.log(
      `${colors.green}Successfully deleted ${totalDeleted} documents from ${collections.length} collections${colors.reset}`,
    );
    console.log(
      `${colors.blue}You can verify the cleanup at: http://localhost:4000/firestore${colors.reset}`,
    );
  } catch (error) {
    console.error(`${colors.red}Unhandled error: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// Run the main function
main().catch((error) => {
  console.error(`${colors.red}Error in main: ${error.message}${colors.reset}`);
  process.exit(1);
});
