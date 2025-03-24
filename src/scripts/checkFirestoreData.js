/**
 * Script to check if data is loaded in Firestore emulator
 * Usage: node src/scripts/checkFirestoreData.js
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

console.log(`${colors.magenta}Checking Firestore Data...${colors.reset}`);

// First, check if emulator is running
function checkEmulatorStatus() {
  return new Promise((resolve, reject) => {
    http
      .get('http://localhost:4000/', (res) => {
        if (res.statusCode === 200) {
          console.log(`${colors.green}✅ Emulator UI is running on port 4000${colors.reset}`);
          resolve(true);
        } else {
          console.log(
            `${colors.red}❌ Emulator UI returned status code ${res.statusCode}${colors.reset}`,
          );
          resolve(false);
        }
      })
      .on('error', (err) => {
        console.log(`${colors.red}❌ Emulator UI is not running: ${err.message}${colors.reset}`);
        resolve(false);
      });
  });
}

// Function to check Firestore collections
function getFirestoreCollections() {
  return new Promise((resolve, reject) => {
    console.log(`${colors.blue}Checking Firestore collections on port 8081...${colors.reset}`);

    const options = {
      hostname: 'localhost',
      port: 8081,
      path: '/v1/projects/demo-clonedbook/databases/(default)/documents',
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`${colors.blue}Received status code: ${res.statusCode}${colors.reset}`);

        if (res.statusCode === 200) {
          try {
            const result = JSON.parse(data);
            resolve(result);
          } catch (err) {
            console.log(
              `${colors.red}Failed to parse response: ${data.substring(0, 200)}...${colors.reset}`,
            );
            reject(new Error(`Error parsing response: ${err.message}`));
          }
        } else {
          console.log(`${colors.red}Response body: ${data}${colors.reset}`);
          reject(new Error(`Request failed with status code ${res.statusCode}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(new Error(`Request error: ${err.message}`));
    });

    req.end();
  });
}

// Check if data file exists and validate its content
function checkDataFile() {
  const dataFilePath = path.join(process.cwd(), 'src', 'data', 'firebase-data.json');
  console.log(`${colors.blue}Checking data file at ${dataFilePath}${colors.reset}`);

  if (!fs.existsSync(dataFilePath)) {
    console.log(`${colors.red}❌ Data file not found${colors.reset}`);
    return null;
  }

  try {
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    const collections = Object.keys(data);
    const totalDocs = collections.reduce((sum, coll) => sum + Object.keys(data[coll]).length, 0);

    console.log(
      `${colors.green}✅ Data file found with ${collections.length} collections and ${totalDocs} documents${colors.reset}`,
    );
    console.log(`${colors.cyan}Collections in data file:${colors.reset}`);
    collections.forEach((coll) => {
      const count = Object.keys(data[coll]).length;
      console.log(`- ${coll}: ${count} documents`);
    });

    return data;
  } catch (err) {
    console.log(`${colors.red}❌ Error reading data file: ${err.message}${colors.reset}`);
    return null;
  }
}

async function checkFirestoreData() {
  console.log(`${colors.yellow}=========================================${colors.reset}`);

  // First check the data file
  const dataFile = checkDataFile();

  console.log(`${colors.yellow}=========================================${colors.reset}`);

  // Check if emulator is running
  const emulatorRunning = await checkEmulatorStatus();
  if (!emulatorRunning) {
    console.log(`${colors.yellow}To start emulators, run:${colors.reset}`);
    console.log(`npm run firebase:emulator:data`);
    return;
  }

  console.log(`${colors.yellow}=========================================${colors.reset}`);

  try {
    // Check firestore collections
    const collections = await getFirestoreCollections();

    if (!collections || !collections.documents || collections.documents.length === 0) {
      console.log(`${colors.red}No collections found in Firestore emulator.${colors.reset}`);
      console.log(`${colors.yellow}Try running the direct populate script:${colors.reset}`);
      console.log(`node tmp/populate-firestore.js`);
      return;
    }

    console.log(`${colors.green}Firestore emulator contains data:${colors.reset}`);

    const collectionNames = new Set();
    collections.documents.forEach((doc) => {
      const path = doc.name.split('/');
      const collectionName = path[path.length - 2];
      collectionNames.add(collectionName);
    });

    console.log(`${colors.cyan}Collections found:${colors.reset}`);
    collectionNames.forEach((name) => {
      console.log(`- ${name}`);
    });

    console.log(`\n${colors.green}✅ Data is properly loaded in Firestore emulator${colors.reset}`);
    console.log(
      `${colors.blue}You can view the data at: http://localhost:8081/firestore/${colors.reset}`,
    );
  } catch (error) {
    console.error(`${colors.red}Error checking Firestore data:${colors.reset}`, error.message);

    console.log(`\n${colors.yellow}Try these troubleshooting steps:${colors.reset}`);
    console.log(`1. Make sure Firebase emulator is running with: npm run firebase:emulator:data`);
    console.log(`2. Try the manual population script: node tmp/populate-firestore.js`);
    console.log(`3. Verify your firebase.json configuration`);
    console.log(`4. Check if port 8081 is available (use 'node kill-ports.js')`);
  }
}

checkFirestoreData();
