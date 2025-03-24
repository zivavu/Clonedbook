/**
 * Utility script to verify Firebase emulator connection and data
 * Run with: node verify-emulator.js
 */
const http = require('http');
const https = require('https');

console.log('Checking Firebase emulator status...');

// Check Firebase Auth emulator
function checkAuthEmulator() {
  return new Promise((resolve) => {
    http
      .get('http://localhost:9099/', (res) => {
        console.log(
          'Firebase Auth Emulator:',
          res.statusCode === 200 ? '✅ Running' : '❌ Not running',
        );
        resolve(res.statusCode === 200);
      })
      .on('error', (err) => {
        console.log('Firebase Auth Emulator: ❌ Not running', err.message);
        resolve(false);
      });
  });
}

// Check Firestore emulator
function checkFirestoreEmulator() {
  return new Promise((resolve) => {
    http
      .get('http://localhost:8081/', (res) => {
        console.log(
          'Firestore Emulator:',
          res.statusCode === 200 ? '✅ Running' : '❌ Not running',
        );
        resolve(res.statusCode === 200);
      })
      .on('error', (err) => {
        console.log('Firestore Emulator: ❌ Not running', err.message);
        resolve(false);
      });
  });
}

// Check Storage emulator
function checkStorageEmulator() {
  return new Promise((resolve) => {
    http
      .get('http://localhost:9199/', (res) => {
        console.log('Storage Emulator:', res.statusCode === 200 ? '✅ Running' : '❌ Not running');
        resolve(res.statusCode === 200);
      })
      .on('error', (err) => {
        console.log('Storage Emulator: ❌ Not running', err.message);
        resolve(false);
      });
  });
}

// Firestore UI is available at http://localhost:8080/firestore
// Emulator UI is available at http://localhost:4000/

async function checkEmulators() {
  console.log('\n====== Firebase Emulator Status ======\n');

  const authRunning = await checkAuthEmulator();
  const firestoreRunning = await checkFirestoreEmulator();
  const storageRunning = await checkStorageEmulator();

  console.log('\n====== Firebase Emulator URLs ======\n');
  console.log('Emulator UI:     http://localhost:4000/');
  console.log('Firestore Data:   http://localhost:8081/firestore/');
  console.log('Database:         http://localhost:9001/');
  console.log('Authentication:   http://localhost:9099/');
  console.log('Cloud Storage:    http://localhost:9199/');

  console.log('\n====== Next Steps ======\n');

  if (!authRunning || !firestoreRunning || !storageRunning) {
    console.log('❌ Some emulators are not running. Start emulators with:');
    console.log('   firebase emulators:start');
    console.log('\nMake sure you have the Firebase CLI installed:');
    console.log('   npm install -g firebase-tools');
  } else {
    console.log('✅ All emulators are running properly!');
    console.log('\nTo view your data:');
    console.log('1. Open http://localhost:4000/ in your browser');
    console.log('2. Click on "Firestore" to view your database data');
    console.log('3. Click on "Authentication" to view users');
    console.log('4. Click on "Storage" to view files');
  }

  console.log('\nTo view the Firestore data directly:');
  console.log('- Open http://localhost:8081/firestore/ in your browser');

  console.log('\n==================================\n');
}

checkEmulators();
