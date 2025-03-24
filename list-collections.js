/**
 * Script to list all collections from Firestore emulator
 * Run with: node list-collections.js
 */
async function main() {
  try {
    // Import Firebase modules
    const { initializeApp } = await import('firebase/app');
    const { getFirestore, connectFirestoreEmulator, collection, getDocs, query, limit } =
      await import('firebase/firestore');

    console.log('Listing all collections in Firestore emulator...');

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
    console.log('Connected to Firestore emulator');

    // Try checking known collections
    console.log('\nChecking known collections...');
    const knownCollections = [
      'users',
      'posts',
      'comments',
      'chats',
      'messages',
      'reactions',
      'test-collection',
    ];

    for (const collName of knownCollections) {
      try {
        const q = query(collection(db, collName), limit(1));
        const snapshot = await getDocs(q);
        console.log(`Collection '${collName}': ${snapshot.empty ? 'Empty' : 'Has data'}`);

        if (!snapshot.empty) {
          console.log(`  First document ID: ${snapshot.docs[0].id}`);
          console.log(
            `  Document data: ${JSON.stringify(snapshot.docs[0].data()).substring(0, 100)}...`,
          );
        }
      } catch (err) {
        console.log(`Error checking collection '${collName}':`, err.message);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
