import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { firebaseConfig, useEmulators } from './env';

const logEmulatorConnection = (service: string, host: string, port: number): void => {
  console.log(
    `%c EMULATOR CONNECTED: ${service} %c ${host}:${port} `,
    'background: #2ecc71; color: white; padding: 2px 4px; border-radius: 3px 0 0 3px;',
    'background: #3498db; color: white; padding: 2px 4px; border-radius: 0 3px 3px 0;',
  );
};

const initializeFirebase = (): FirebaseApp => {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0];
  }

  const app = initializeApp(firebaseConfig);

  if (useEmulators) {
    try {
      const db = getFirestore(app);
      connectFirestoreEmulator(db, 'localhost', 8080);
      logEmulatorConnection('Firestore', 'localhost', 8080);

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
export const db = firestore;
export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);

if (typeof window !== 'undefined' && useEmulators) {
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

  indicator.addEventListener('click', () => {
    alert(
      'Running with Firebase Emulators:\n- Firestore: localhost:8080\n- Auth: localhost:9099\n- Storage: localhost:9199\n\nEmulator UI: http://localhost:4000',
    );
  });

  window.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(indicator);
  });
}

export default {
  firebaseApp,
  firestore,
  db,
  storage,
  useEmulators,
};
