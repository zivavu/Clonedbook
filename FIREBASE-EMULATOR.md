# Firebase Emulator Debugging Guide

This guide aims to help you troubleshoot and debug issues with the Firebase emulator for the Clonedbook project.

## Available Scripts

We've added several scripts to help you debug and test the Firebase emulator:

```bash
# Start the Firebase emulator
npm run firebase:emulator

# Check Firestore emulator connection
npm run firebase:test

# Add a test document to verify connectivity
npm run firebase:test

# Populate the Firestore emulator with sample data
npm run firebase:populate

# Clear all data from the Firestore emulator
npm run firebase:clear

# List collections and sample documents
npm run firebase:list

# Run detailed debug scan of Firestore collections/documents
npm run firebase:debug

# Open Firebase UI in browser
npm run firebase:ui
```

## Troubleshooting Common Issues

### Data not visible in Firebase UI

If you've populated data using `npm run firebase:populate` but can't see it in the Firebase UI:

1. **Check connectivity**: Run `npm run firebase:test` to verify that the emulator is running and accessible.
2. **Verify data exists**: Run `npm run firebase:debug` to see if data actually exists in the collections.
3. **Open UI directly**: Use `npm run firebase:ui` to open both UI interfaces.
4. **Browser cache**: Try force-refreshing the browser (Ctrl+F5) to clear cache.
5. **Project ID**: Ensure the project ID used in the emulator is `demo-clonedbook`.

### Data Population Issues

If you're having trouble populating data:

1. **Emulator Status**: Ensure the emulator is running with `npm run firebase:emulator`.
2. **Clear First**: Try clearing existing data with `npm run firebase:clear` before populating.
3. **Check Batch Size**: The population script uses batches of 450 documents at a time. If encountering errors, you can adjust this in the `populate-firebase.js` file.

### UI Access URLs

The Firebase Emulator can be accessed at multiple URLs:

- **Emulator Suite UI**: http://localhost:4000/firestore
- **Direct Firestore UI**: http://localhost:8081/firestore
- **Raw API Access**: http://localhost:8081/v1/projects/demo-clonedbook/databases/(default)/documents

## Data Structure

The emulator is populated with these collections:

- `users`: User profiles
- `posts`: User posts
- `comments`: Comments on posts
- `chats`: Chat conversations
- `messages`: Messages within chats
- `reactions`: Reactions to posts and comments
- `userBasicInfo`: Minimal user profile info
- `userPublicFriends`: User friendship relationships

## Restarting the Emulator

If you encounter persistent issues:

1. Kill any running emulator processes
2. Clear ports: `npm run kill-ports`
3. Start fresh: `npm run firebase:emulator`
4. Repopulate data: `npm run firebase:populate`

## Running the App with Local Emulator

To run the app with the local Firebase emulator:

```bash
npm run dev:local
```

This sets the necessary environment variables to connect to the local emulator.
