# Local Development Guide

This guide explains how to set up and run Clonedbook with local data using Firebase emulators. This approach allows you to develop against a local Firebase instance without connecting to the production Firebase project.

## Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [Bun](https://bun.sh/)
- [Firebase CLI](https://firebase.google.com/docs/cli)
  ```bash
  npm install -g firebase-tools
  ```
- Java Runtime Environment (JRE) v8+ for Firebase emulators
  - The Firebase emulators require Java to run

## Initial Setup

1. **Clone the repository and install dependencies**:

   ```bash
   git clone https://github.com/zivavu/Clonedbook.git
   cd Clonedbook
   bun install
   ```

2. **Run the setup script**:

   ```bash
   bun run setup:local
   ```

   This script will:

   - Generate test data
   - Create necessary environment files
   - Configure Firebase emulators
   - Populate emulators with test data

## Running the Application Locally

Once the setup is complete, you'll need to run two processes:

1. **Start the Firebase emulators**:

   ```bash
   bun run emulators:start:import
   ```

2. **In a separate terminal, start the Next.js development server**:

   ```bash
   bun run dev:local
   ```

3. **Access the application**:
   - Web application: http://localhost:3000
   - Firebase Emulator UI: http://localhost:4000

## Understanding the Local Environment

### Generated Data

The local environment uses randomly generated data that includes:

- 100 user profiles with pictures
- 300+ chat conversations
- 400+ posts with comments and reactions
- User friendships and connections

### Directory Structure

- `src/local/data/` - Contains the generated data in JSON format
- `firebase-emulator-data/` - Contains persisted emulator data
- `temp/` - Temporary directory for downloaded images during setup

### Available Scripts

- `bun run generate:data` - Generate fresh test data
- `bun run emulators:start` - Start Firebase emulators without importing data
- `bun run emulators:start:import` - Start emulators with data import/export
- `bun run emulators:populate` - Populate running emulators with test data
- `bun run dev:local` - Run Next.js in local development mode with emulators
- `bun run setup:local` - Complete setup of local development environment

## Troubleshooting

### Emulators Won't Start

If the Firebase emulators won't start:

1. Make sure Java is installed and on your PATH

   ```bash
   java -version
   ```

2. Check if the emulator ports are in use by other applications:
   - Firestore: 8080
   - Auth: 9099
   - Storage: 9199
   - Emulator UI: 4000

### Data Doesn't Appear

If you don't see data in the application:

1. Make sure both the emulators and Next.js are running
2. Check that you're using `bun run dev:local` and not just `bun run dev`
3. Verify that the emulator imported data correctly in the Emulator UI

## Customizing Test Data

To modify the generated test data, you can edit:

- `src/scripts/dataGeneration/generateData.ts` - Configuration for data generation
- `src/scripts/dataGeneration/dataGenerator.ts` - Core data generation logic

After making changes, regenerate the data:

```bash
bun run generate:data
```

## Working with Images

The application handles two types of images:

- User profile pictures in `users/{userId}/pictures/`
- Post images in `posts/{postId}/`

These images are downloaded from placeholder sources during setup and uploaded to the Firebase Storage emulator.
