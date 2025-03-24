/**
 * Firebase configuration
 * Supports both production and local emulator environments
 */
import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import {
  Auth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  connectFirestoreEmulator,
  enableIndexedDbPersistence,
  Firestore,
  getFirestore,
} from 'firebase/firestore';
import { connectStorageEmulator, FirebaseStorage, getStorage } from 'firebase/storage';

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

// Determine if we should use emulators (client-side only)
let useEmulator = false;
if (typeof window !== 'undefined') {
  useEmulator =
    process.env.NODE_ENV === 'development' &&
    (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true' ||
      process.env.USE_FIREBASE_EMULATOR === 'true');
}

// Singleton pattern for Firebase services to prevent multiple initializations
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

// Initialize Firebase only if no apps exist
// This is important for Next.js which might execute this file multiple times
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  // Connect to emulators only in the browser
  if (typeof window !== 'undefined' && useEmulator) {
    try {
      console.log('🔥 Connecting to Firebase emulators...');
      connectAuthEmulator(auth, 'http://localhost:9099');
      connectFirestoreEmulator(db, 'localhost', 8081);
      connectStorageEmulator(storage, 'localhost', 9199);
      console.log('✅ Connected to all Firebase emulators');
    } catch (error) {
      console.error('❌ Error connecting to Firebase emulators:', error);
    }
  }

  // Enable persistence only on the client
  if (typeof window !== 'undefined') {
    enableIndexedDbPersistence(db).catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Firestore persistence failed: Multiple tabs open');
      } else if (err.code === 'unimplemented') {
        console.warn('Firestore persistence not available in this browser');
      } else {
        console.error('Firestore persistence error:', err);
      }
    });
  }
} else {
  // If apps already exist, use the first one
  app = getApps()[0]!;
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

// Log environment status
if (typeof window !== 'undefined') {
  console.log('Firebase environment check:');
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- USE_FIREBASE_EMULATOR:', process.env.USE_FIREBASE_EMULATOR);
  console.log(
    '- NEXT_PUBLIC_USE_FIREBASE_EMULATOR:',
    process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR,
  );
  console.log('- Using emulators:', useEmulator);
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
