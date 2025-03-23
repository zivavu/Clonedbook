/**
 * Firebase configuration
 * Supports both production and local emulator environments
 */
import { initializeApp } from 'firebase/app';
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  connectFirestoreEmulator,
  enableIndexedDbPersistence,
  getFirestore,
} from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

// Log environment variables for debugging
if (typeof window !== 'undefined') {
  console.log('Firebase environment check:');
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- USE_FIREBASE_EMULATOR:', process.env.USE_FIREBASE_EMULATOR);
  console.log(
    '- NEXT_PUBLIC_USE_FIREBASE_EMULATOR:',
    process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR,
  );
}

// Check if we should use emulators
const useEmulator =
  typeof window !== 'undefined' &&
  process.env.NODE_ENV === 'development' &&
  (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true' ||
    process.env.USE_FIREBASE_EMULATOR === 'true');

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
    process.env.NEXT_PUBLIC_MESSENGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Connect to Firebase emulators first, before any other operations
if (useEmulator) {
  console.log('🔥 Using Firebase emulators in local mode');
  try {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
  } catch (error) {
    console.error('Error connecting to Firebase emulators:', error);
  }
}

// Enable offline persistence for Firestore (after emulator setup)
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Firestore persistence initialization failed: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
      console.warn('Firestore persistence not available in this browser');
    } else {
      console.error('Firestore persistence initialization error:', err);
    }
  });
}

if (typeof window !== 'undefined') {
  console.log('- Using emulators:', useEmulator);

  // Force clear any cached values if in development mode
  if (process.env.NODE_ENV === 'development') {
    if (
      (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true' ||
        process.env.USE_FIREBASE_EMULATOR === 'true') &&
      !useEmulator
    ) {
      console.warn('WARNING: Firebase emulator setting mismatch. Try refreshing the page.');
    }
  }
}

/**
 * Helper function for development to easily create a test user
 */
export const createTestUser = async (email: string, password: string): Promise<void> => {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('This function is only available in development mode');
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log(`Test user created: ${email}`);
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(`Signed in as existing test user: ${email}`);
    } else {
      console.error('Error creating test user:', error);
      throw error;
    }
  }
};

export { app, auth, db, storage };
export const isUsingEmulator = useEmulator;
