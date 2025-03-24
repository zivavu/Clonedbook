/**
 * Firestore Debug Script
 *
 * This script scans the Firestore emulator and outputs detailed information
 * about collections and documents to help debug visibility issues.
 *
 * Usage: node firestore-debug.js
 */
async function main() {
  try {
    // Import Firebase modules
    const { initializeApp } = await import('firebase/app');
    const { getFirestore, connectFirestoreEmulator, collection, getDocs, query, limit } =
      await import('firebase/firestore');

    console.log('Starting Firestore Debug Tool...');

    // Initialize Firebase with explicit project ID
    const firebaseConfig = {
      projectId: 'demo-clonedbook',
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log('Firebase initialized');

    // Get Firestore and connect to emulator
    const db = getFirestore(app);
    connectFirestoreEmulator(db, 'localhost', 8081);
    console.log('Connected to Firestore emulator at localhost:8081');

    // Collections to check
    const collections = [
      'users',
      'posts',
      'comments',
      'chats',
      'messages',
      'reactions',
      'userBasicInfo',
      'userPublicFriends',
      'test-collection',
    ];

    console.log('\n=============== COLLECTION SCAN ===============');

    // Check each collection
    for (const collName of collections) {
      try {
        console.log(`\nChecking collection '${collName}'...`);

        // Get all documents in the collection
        const collRef = collection(db, collName);
        const snapshot = await getDocs(collRef);

        if (snapshot.empty) {
          console.log(`  Collection '${collName}' is EMPTY`);
          continue;
        }

        console.log(`  Collection '${collName}' has ${snapshot.size} documents`);

        // Sample some documents
        if (snapshot.size > 0) {
          console.log('  Sample documents:');
          let count = 0;
          for (const doc of snapshot.docs) {
            if (count >= 3) break; // Limit to 3 samples

            console.log(`    Document ID: ${doc.id}`);
            const data = doc.data();
            const keys = Object.keys(data);

            console.log(
              `    Fields: ${keys.length > 0 ? keys.slice(0, 5).join(', ') + (keys.length > 5 ? '...' : '') : 'none'}`,
            );

            // Try to show a snippet of data
            try {
              const dataStr = JSON.stringify(data).substring(0, 100);
              console.log(`    Preview: ${dataStr}${dataStr.length === 100 ? '...' : ''}`);
            } catch (e) {
              console.log('    Preview: [Error stringifying data]');
            }

            console.log('    ---');
            count++;
          }
        }
      } catch (err) {
        console.log(`  Error checking collection '${collName}': ${err.message}`);
      }
    }

    // Provide UI URLs
    console.log('\n=============== ACCESS INFO ===============');
    console.log('Firestore UI URLs:');
    console.log('1. Firebase Emulator Suite UI: http://localhost:4000/firestore');
    console.log('2. Direct Firestore UI: http://localhost:8081/firestore');
    console.log(
      '3. Raw Firestore API: http://localhost:8081/v1/projects/demo-clonedbook/databases/(default)/documents',
    );

    console.log('\n=============== DEBUG TIPS ===============');
    console.log('If data is not visible in the UI but exists in this scan:');
    console.log('1. Try refreshing the browser cache (Ctrl+F5)');
    console.log("2. Check if you're using the correct project ID (demo-clonedbook)");
    console.log('3. Verify the emulator is running correctly with: curl http://localhost:8081');
    console.log('4. Try restarting the emulator with: firebase emulators:start');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
