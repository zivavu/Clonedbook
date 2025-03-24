# Firebase Emulator Setup Guide

This guide will help you set up Firebase emulators to run a local development environment for your Clonedbook application.

## Prerequisites

1. **Node.js and npm**: Make sure you have Node.js and npm installed
2. **Firebase CLI**: Install the Firebase CLI globally
   ```
   npm install -g firebase-tools
   ```
3. **Java**: Firebase emulators require Java 11 or newer

## Step 1: Log in to Firebase

```bash
firebase login
```

## Step 2: Create a firebase.json file

Create a `firebase.json` file in the root of your project with the following content:

```json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "storage": {
    "rules": "storage.rules"
  },
  "emulators": {
    "auth": {
      "port": 9099
    },
    "firestore": {
      "port": 8081
    },
    "database": {
      "port": 9001
    },
    "storage": {
      "port": 9199
    },
    "ui": {
      "enabled": true,
      "port": 4000
    }
  }
}
```

## Step 3: Create rule files

Create the following files:

**firestore.rules**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**firestore.indexes.json**:

```json
{
  "indexes": [],
  "fieldOverrides": []
}
```

**storage.rules**:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

## Step 4: Start the emulators

Run the following command to start the emulators:

```bash
firebase emulators:start
```

## Step 5: Run your app in local mode

Run your application with the local environment configuration:

```bash
bun run dev:local
```

## Verifying Emulator Connection

You can use the included verification script to check if your emulators are running:

```bash
node verify-emulator.js
```

## Viewing Emulator Data

- **Main Emulator UI**: http://localhost:4000/
- **Firestore Data**: http://localhost:8081/firestore/
- **Database**: http://localhost:9001/
- **Authentication**: http://localhost:9099/
- **Storage**: http://localhost:9199/

## Importing/Exporting Data

To save your data between emulator sessions:

```bash
# Export
firebase emulators:export ./emulator-data

# Start with imported data
firebase emulators:start --import=./emulator-data --export-on-exit
```

## Troubleshooting

1. **Emulator not connecting**: Verify emulators are running with `node verify-emulator.js`
2. **Data not showing up**:
   - Check the Firestore UI at http://localhost:8081/firestore/
   - Make sure your code is using the emulator configuration correctly
3. **Port conflicts**:
   - If you get errors about ports being unavailable, you can change them in firebase.json
   - Don't forget to update the connection ports in your code as well
4. **Environment variables**:
   - Ensure `NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true` is set when running your app
   - Restart your Next.js server after making changes

## Using the Emulators

When using emulators:

1. All data is stored locally, not in the cloud
2. Authentication, Firestore, and Storage will all work without internet connection
3. You can add test data through the Emulator UI at http://localhost:4000/
