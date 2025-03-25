import { FirebaseApp, FirebaseOptions, getApps, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

// Production environment variables from .env
const prodConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSENGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Local environment config for emulator
const localConfig: FirebaseOptions = {
  apiKey: 'demo-api-key',
  authDomain: 'demo-project.firebaseapp.com',
  projectId: 'demo-project',
  storageBucket: 'demo-project.appspot.com',
  messagingSenderId: 'demo-messaging-sender-id',
  appId: 'demo-app-id',
};

// Check if we're in local development mode
const isLocalDev = process.env.NEXT_PUBLIC_USE_EMULATOR === 'true';

/**
 * Helper function to create a styled log message
 */
const logEmulatorConnection = (service: string, host: string, port: number): void => {
  console.log(
    `%c EMULATOR CONNECTED: ${service} %c ${host}:${port} `,
    'background: #2ecc71; color: white; padding: 2px 4px; border-radius: 3px 0 0 3px;',
    'background: #3498db; color: white; padding: 2px 4px; border-radius: 0 3px 3px 0;',
  );
};

// Initialize Firebase
const initializeFirebase = (): FirebaseApp => {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0];
  }

  console.log(`Initializing Firebase in ${isLocalDev ? 'LOCAL EMULATOR' : 'PRODUCTION'} mode`);
  const config = isLocalDev ? localConfig : prodConfig;
  const app = initializeApp(config);

  if (isLocalDev) {
    try {
      // Connect to Auth emulator
      const auth = getAuth(app);
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      logEmulatorConnection('Auth', 'localhost', 9099);

      // Connect to Firestore emulator
      const db = getFirestore(app);
      connectFirestoreEmulator(db, 'localhost', 8080);
      logEmulatorConnection('Firestore', 'localhost', 8080);

      // Connect to Storage emulator
      const storage = getStorage(app);
      connectStorageEmulator(storage, 'localhost', 9199);
      logEmulatorConnection('Storage', 'localhost', 9199);

      console.log(
        '%c All Firebase emulators connected successfully! ',
        'background: #8e44ad; color: white; padding: 4px 8px; border-radius: 3px;',
      );
    } catch (error) {
      console.error('Error connecting to Firebase emulators:', error);
      console.log(
        '%c EMULATOR CONNECTION FAILED. Is the emulator running? ',
        'background: #e74c3c; color: white; padding: 4px 8px; border-radius: 3px;',
      );
      console.log('Start emulators with: bun run emulators:start:import');
    }
  }

  return app;
};

export const firebaseApp = initializeFirebase();
export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);

// Create a development indicator that's more visible
if (typeof window !== 'undefined' && isLocalDev) {
  const indicator = document.createElement('div');
  indicator.style.position = 'fixed';
  indicator.style.bottom = '10px';
  indicator.style.right = '10px';
  indicator.style.padding = '8px 12px';
  indicator.style.borderRadius = '8px';
  indicator.style.backgroundColor = 'rgba(231, 76, 60, 0.9)';
  indicator.style.color = 'white';
  indicator.style.fontWeight = 'bold';
  indicator.style.fontSize = '14px';
  indicator.style.zIndex = '9999';
  indicator.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
  indicator.textContent = '🔥 LOCAL DEV';
  indicator.style.cursor = 'pointer';
  indicator.title = 'Using Firebase Emulators';

  // Add click handler to display more info
  indicator.addEventListener('click', () => {
    alert(
      'Running with Firebase Emulators:\n- Firestore: localhost:8080\n- Auth: localhost:9099\n- Storage: localhost:9199\n\nEmulator UI: http://localhost:4000',
    );
  });

  // Add to body when DOM is ready
  window.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(indicator);
  });
}

export default {
  firebaseApp,
  firestore,
  storage,
  auth,
  isLocalDev,
};
