/**
 * This script imports the generated JSON data into Firebase emulators
 * It assumes the emulators are already running
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function importToEmulators() {
  try {
    console.log('Preparing to import data to Firebase emulators...');

    // Path to the generated data files
    const dataDir = path.join(process.cwd(), 'src/data');

    // Path to temporary import directory for Firebase
    const tempImportDir = path.join(process.cwd(), 'temp-firebase-import');

    // Create the directory structure Firebase expects
    const firestoreDir = path.join(tempImportDir, 'firestore_export', 'firestore_export.json');

    // Make sure directories exist
    fs.mkdirSync(path.dirname(firestoreDir), { recursive: true });

    // Combine all Firebase data into one structure
    const firestoreData = {
      database_id: 'demo-project',
      export_metadata: {
        version: 'dev',
        timestamp: new Date().toISOString(),
      },
      collections: {},
    };

    // Load users data
    if (fs.existsSync(path.join(dataDir, 'firebase-users.json'))) {
      const usersData = JSON.parse(
        fs.readFileSync(path.join(dataDir, 'firebase-users.json'), 'utf8'),
      );
      firestoreData.collections['users'] = Object.entries(usersData).map(([id, data]) => ({
        id,
        data,
      }));
    }

    // Load chats data
    if (fs.existsSync(path.join(dataDir, 'firebase-chats.json'))) {
      const chatsData = JSON.parse(
        fs.readFileSync(path.join(dataDir, 'firebase-chats.json'), 'utf8'),
      );
      firestoreData.collections['chats'] = Object.entries(chatsData).map(([id, data]) => ({
        id,
        data,
      }));
    }

    // Load posts data
    if (fs.existsSync(path.join(dataDir, 'firebase-posts.json'))) {
      const postsData = JSON.parse(
        fs.readFileSync(path.join(dataDir, 'firebase-posts.json'), 'utf8'),
      );
      firestoreData.collections['posts'] = Object.entries(postsData).map(([id, data]) => ({
        id,
        data,
      }));
    }

    // Handle usersPublicData specially since it's a collection with documents
    if (fs.existsSync(path.join(dataDir, 'firebase-usersPublicData.json'))) {
      const publicData = JSON.parse(
        fs.readFileSync(path.join(dataDir, 'firebase-usersPublicData.json'), 'utf8'),
      );

      firestoreData.collections['usersPublicData'] = [
        {
          id: 'usersBasicInfo',
          data: publicData.usersBasicInfo || {},
        },
        {
          id: 'usersPublicFriends',
          data: publicData.usersPublicFriends || {},
        },
      ];
    }

    // Write the combined data to the firestore export file
    fs.writeFileSync(firestoreDir, JSON.stringify(firestoreData, null, 2));

    console.log('Combined firestore data written to:', firestoreDir);

    // Stop existing emulators to clear data
    try {
      console.log('Stopping existing emulators...');
      execSync('firebase emulators:stop', { stdio: 'inherit' });
    } catch (error) {
      console.log('No emulators were running or failed to stop them. Continuing...');
    }

    // Start emulators with the new data
    console.log('Starting emulators with new data...');
    execSync(
      `firebase emulators:start --project=demo-project --import=${tempImportDir} --export-on-exit=${tempImportDir}`,
      { stdio: 'inherit' },
    );

    console.log('Firebase emulators started with new data!');
  } catch (error) {
    console.error('Error importing to emulators:', error);
    process.exit(1);
  }
}

// Run the import
importToEmulators();
