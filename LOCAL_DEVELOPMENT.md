# Local Development Guide

This guide will help you set up and use the local development environment for this project, including a Firebase emulator and an Algolia mock.

## Prerequisites

- Make sure you have [Bun](https://bun.sh/) installed
- The Firebase CLI should be installed globally: `bun add -g firebase-tools`
- You should be logged in to Firebase: `firebase login`
- Java JDK 11 or higher is required for Firebase Emulator
  - You can download it from [Oracle](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) or use [OpenJDK](https://adoptopenjdk.net/)
  - Verify your Java version with `java -version`

## Generate Test Data

The project comes with a data generation script that creates realistic test data for the application:

```bash
bun run generate:data
```

This will create two files:

- `src/data/firebase-data.json`: Contains all data for Firebase Firestore
- `src/data/algolia-data.json`: Contains user data for Algolia search

## Running Firebase Local Emulator

To start the Firebase emulator with the generated test data:

```bash
bun run firebase:emulator
```

This will:

1. Check if data files exist, and generate them if needed
2. Convert the data to Firestore format
3. Start the Firebase emulators (Auth, Firestore, Storage)
4. Load the generated data into the emulators
5. Create an Algolia mock implementation

The Firebase Emulator UI will be available at http://localhost:4000

## Using the Local Environment in Development

To run the Next.js development server with both local Firebase emulator and Algolia mock:

```bash
# First, start the Firebase emulator in a separate terminal
bun run firebase:emulator

# Then, in another terminal, start the development server
bun run dev:local
```

The `dev:local` script sets the following environment variables:

- `USE_ALGOLIA_MOCK=true`: Makes the application use the mock Algolia implementation
- `USE_FIREBASE_EMULATOR=true`: Makes the application connect to the local Firebase emulators

## Development Mode Indicator

When running in development mode, you'll see a small indicator in the bottom-right corner of the screen that shows which environment you're connected to:

- 🟢 Green: Using local (emulator/mock)
- 🔴 Red: Using production services

This helps you verify that your application is correctly using the local development environment.

## Connecting to Firebase Emulator

The application is configured to automatically connect to Firebase emulators when the `USE_FIREBASE_EMULATOR` environment variable is set to `true`. This happens when using the `dev:local` script.

## Simulating User Authentication

With the Firebase Auth emulator, you can easily simulate user authentication without real credentials:

1. Start the Firebase emulator using `bun run firebase:emulator`
2. Go to the Firebase Emulator UI at http://localhost:4000
3. Navigate to the Authentication section
4. Create a new user or select an existing user
5. Use the "Sign in as" button to simulate authentication

## Data Persistence

The Firebase emulator is configured to export data when it shuts down (`--export-on-exit` flag). This means any changes you make to the data during development will be saved to the `tmp` directory and loaded again when you restart the emulator.

## Testing with Emulated Services

When running TestCafe tests with `bun run test:e2e` or `bun run test:e2e-gh`, the tests will use the generated data and can work with the Firebase emulator if it's running.

## Troubleshooting

### Firebase Emulator Issues

If you encounter issues with the Firebase emulator:

1. Make sure you're logged in to Firebase: `firebase login`
2. Try clearing the emulator cache: `firebase emulators:start --clear-data`
3. Check if any process is already using the emulator ports (9099, 8080, 9199, 4000)

### Algolia Mock Issues

If the Algolia mock is not working:

1. Make sure you're running the app with `bun run dev:local`
2. Check that the `src/mocks/algoliaMock.ts` file exists
3. Verify that the `src/config/algolia.ts` file is correctly importing the mock

### Still Seeing Production Data?

If you're still seeing production data when using `dev:local`:

1. Check the Development Mode Indicator in the bottom-right corner to see if you're actually using local services
2. Make sure the Firebase emulator is running in a separate terminal
3. Restart your development server to ensure the environment variables are properly applied
4. Clear your browser cache and local storage
