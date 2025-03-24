/**
 * Script to add a test document to Firestore emulator
 * Run with: node test-firestore.js
 */
async function main() {
  try {
    // Import Firebase modules
    const { initializeApp } = await import('firebase/app');
    const { getFirestore, connectFirestoreEmulator, collection, doc, setDoc, getDoc } =
      await import('firebase/firestore');

    console.log('Testing Firestore emulator connection...');

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

    // Create a test collection and document
    const testCollection = 'test-collection';
    const testDocId = 'test-document';
    const testData = {
      name: 'Test Document',
      createdAt: new Date().toISOString(),
      testValue: Math.floor(Math.random() * 1000),
    };

    console.log(`Adding test document to collection '${testCollection}'...`);
    await setDoc(doc(db, testCollection, testDocId), testData);
    console.log('Test document added successfully!');

    // Verify the document was added
    console.log('Verifying document was added...');
    const docRef = doc(db, testCollection, testDocId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document successfully retrieved!');
      console.log('Document data:', docSnap.data());
    } else {
      console.log('Document not found. Something went wrong.');
    }

    console.log(
      '\nTest completed. If you see the document data above, the emulator is working correctly.',
    );
    console.log(
      'Check the Firestore UI at http://localhost:4000/firestore to see if the document appears there.',
    );
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
