/**
 * Simple direct test to add one document to Firestore emulator
 * Run with: node direct-test.js
 */
async function main() {
  try {
    // Import Firebase modules
    const { initializeApp } = await import('firebase/app');
    const { getFirestore, connectFirestoreEmulator, doc, setDoc } = await import(
      'firebase/firestore'
    );

    console.log('Starting direct test...');

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

    // Add a single test document
    const testDocRef = doc(db, 'test-collection', 'test-document');
    await setDoc(testDocRef, {
      message: 'Test document',
      timestamp: new Date().toISOString(),
    });

    console.log('Test document added successfully!');
    console.log('Please check http://localhost:4000/firestore to verify');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
