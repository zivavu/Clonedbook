/**
 * Direct Firebase Emulator Population Script
 *
 * This script directly populates the Firebase emulator with data from the src/data/firebase-data.json file.
 * Usage: node populate-firebase.js
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

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

console.log(`${colors.magenta}====== Direct Firebase Emulator Population ======${colors.reset}\n`);

// Check if emulator is running first
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

// Import Firebase modules - using dynamic import for ESM support
async function main() {
  // First check if emulator is running
  const emulatorRunning = await checkEmulatorRunning();
  if (!emulatorRunning) {
    console.error(
      `${colors.red}Please start the Firebase emulator before running this script${colors.reset}`,
    );
    process.exit(1);
  }

  try {
    // Use dynamic import for Firebase modules
    const { initializeApp } = await import('firebase/app');
    const {
      getFirestore,
      connectFirestoreEmulator,
      writeBatch,
      doc,
      getDocs,
      collection,
      query,
      limit,
    } = await import('firebase/firestore');

    // Path to the data file
    const dataFilePath = path.join(process.cwd(), 'src', 'data', 'firebase-data.json');

    // Check if data file exists
    if (!fs.existsSync(dataFilePath)) {
      console.error(`${colors.red}Error: Data file not found at ${dataFilePath}${colors.reset}`);
      process.exit(1);
    }

    // Read and parse the data file
    console.log(`${colors.blue}Reading data from ${dataFilePath}...${colors.reset}`);
    let data;
    try {
      const fileContents = fs.readFileSync(dataFilePath, 'utf8');
      data = JSON.parse(fileContents);

      // Output summary of data
      const collections = Object.keys(data);
      const totalDocs = collections.reduce((sum, coll) => sum + Object.keys(data[coll]).length, 0);
      console.log(
        `${colors.green}Successfully loaded ${collections.length} collections with ${totalDocs} documents.${colors.reset}`,
      );
    } catch (error) {
      console.error(
        `${colors.red}Error reading or parsing data file: ${error.message}${colors.reset}`,
      );
      process.exit(1);
    }

    // Initialize Firebase with a dummy config (we'll use emulator)
    const firebaseConfig = {
      apiKey: 'demo-api-key',
      authDomain: 'demo-clonedbook.firebaseapp.com',
      projectId: 'demo-clonedbook',
      storageBucket: 'demo-clonedbook.appspot.com',
    };

    // Initialize Firebase
    let app;
    try {
      app = initializeApp(firebaseConfig);
      console.log(`${colors.green}Firebase initialized successfully${colors.reset}`);
    } catch (error) {
      console.error(`${colors.red}Error initializing Firebase: ${error.message}${colors.reset}`);
      process.exit(1);
    }

    // Get Firestore and connect to emulator
    const db = getFirestore(app);
    connectFirestoreEmulator(db, 'localhost', 8081);
    console.log(`${colors.green}Connected to Firestore emulator on localhost:8081${colors.reset}`);

    // First, check if data already exists
    try {
      const checkCollection = Object.keys(data)[0]; // Check first collection
      const checkQuery = query(collection(db, checkCollection), limit(1));
      const checkSnapshot = await getDocs(checkQuery);

      if (!checkSnapshot.empty) {
        console.log(`${colors.yellow}⚠️ Data already exists in the emulator!${colors.reset}`);
        const confirmContinue = true; // In a real script, you'd ask for confirmation
        if (!confirmContinue) {
          console.log(`${colors.yellow}Exiting without making changes.${colors.reset}`);
          process.exit(0);
        }
        console.log(`${colors.yellow}Continuing with data population...${colors.reset}`);
      }
    } catch (error) {
      console.log(`${colors.yellow}Could not check existing data: ${error.message}${colors.reset}`);
    }

    // Function to populate Firestore using batches
    async function populateFirestore() {
      console.log(`${colors.yellow}Starting to populate Firestore...${colors.reset}`);

      // Keep track of success/failure counts
      let successCount = 0;
      let errorCount = 0;
      let batchCount = 0;

      // Max batch size is 500 operations
      const BATCH_SIZE = 450;

      // Process each collection
      for (const collectionName of Object.keys(data)) {
        console.log(`\n${colors.cyan}Populating collection: ${collectionName}${colors.reset}`);
        const documents = data[collectionName];
        const documentIds = Object.keys(documents);

        // Create batches for this collection
        for (let i = 0; i < documentIds.length; i += BATCH_SIZE) {
          try {
            // Create a new batch
            const batch = writeBatch(db);
            const currentBatchSize = Math.min(BATCH_SIZE, documentIds.length - i);

            console.log(
              `${colors.yellow}Creating batch ${++batchCount} with ${currentBatchSize} documents...${colors.reset}`,
            );

            // Add operations to batch
            let batchDocCount = 0;
            for (let j = 0; j < currentBatchSize; j++) {
              const docId = documentIds[i + j];
              const docData = documents[docId];
              const docRef = doc(db, collectionName, docId);
              batch.set(docRef, docData);
              batchDocCount++;
            }

            // Commit the batch
            await batch.commit();
            console.log(
              `${colors.green}✓ Committed batch ${batchCount} with ${batchDocCount} documents${colors.reset}`,
            );
            successCount += batchDocCount;

            // Add a small delay to prevent issues
            await new Promise((resolve) => setTimeout(resolve, 500));
          } catch (error) {
            console.error(`${colors.red}✗ Error committing batch: ${error.message}${colors.reset}`);
            errorCount += Math.min(BATCH_SIZE, documentIds.length - i);
          }
        }
      }

      console.log(`\n${colors.magenta}====== Population Summary ======${colors.reset}`);
      console.log(
        `${colors.green}Successfully added: ${successCount} documents in ${batchCount} batches${colors.reset}`,
      );
      if (errorCount > 0) {
        console.log(`${colors.red}Failed to add: ${errorCount} documents${colors.reset}`);
      }
    }

    // Verify data after population
    async function verifyData() {
      try {
        console.log(`\n${colors.yellow}Verifying data in Firestore...${colors.reset}`);
        let totalVerified = 0;

        for (const collectionName of Object.keys(data)) {
          const expectedCount = Object.keys(data[collectionName]).length;
          const querySnapshot = await getDocs(collection(db, collectionName));
          const actualCount = querySnapshot.size;

          console.log(
            `${colors.cyan}Collection ${collectionName}:${colors.reset} ${actualCount}/${expectedCount} documents`,
          );
          totalVerified += actualCount;
        }

        console.log(`\n${colors.green}Total documents verified: ${totalVerified}${colors.reset}`);
        console.log(
          `${colors.blue}You can view your data at: http://localhost:4000/firestore${colors.reset}`,
        );
        console.log(
          `${colors.blue}Direct Firestore UI: http://localhost:8081/firestore${colors.reset}`,
        );
      } catch (error) {
        console.error(`${colors.red}Error verifying data: ${error.message}${colors.reset}`);
      }
    }

    // Run population and verification
    await populateFirestore();
    await verifyData();

    console.log(`\n${colors.magenta}====== Population Complete ======${colors.reset}`);
    console.log(`${colors.yellow}Press Ctrl+C to exit this script${colors.reset}`);
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
