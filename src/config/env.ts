// Configuration for environment switching
// This allows us to use the same code base with different environments

import { FirebaseOptions } from 'firebase/app';

// Check if we're using emulators - this is set by our npm scripts
export const useEmulators = process.env.NEXT_PUBLIC_USE_EMULATOR === 'true';

// Firebase configuration
export const firebaseConfig: FirebaseOptions = useEmulators
  ? {
      apiKey: 'demo-api-key',
      authDomain: 'facebook-clone-54d49.firebaseapp.com',
      projectId: 'facebook-clone-54d49',
      storageBucket: 'facebook-clone-54d49.appspot.com',
      messagingSenderId: 'demo-messaging-sender-id',
      appId: 'demo-app-id',
    }
  : {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSENGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_APP_ID,
    };

export const emulatorHosts = {
  firestore: 'localhost:8080',
  storage: 'localhost:9199',
  functions: 'localhost:5001',
  database: 'localhost:9000',
};

export const debugEnv = {
  NEXT_PUBLIC_USE_EMULATOR: process.env.NEXT_PUBLIC_USE_EMULATOR,
};

export default {
  useEmulators,
  firebaseConfig,
  emulatorHosts,
  debugEnv,
};
