/**
 * Comprehensive script to generate data, clean Firebase emulators, and import new data
 * This handles everything in the correct sequence
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🔥 Starting comprehensive data generation and Firebase update');

try {
  // Step 1: Release any ports to ensure emulators can start
  console.log('\n🛑 Stopping emulators and releasing ports...');
  execSync('bun run release:ports', { stdio: 'inherit' });

  // Step 2: Generate the data
  console.log('\n📊 Generating new data...');
  execSync('bun src/scripts/dataGeneration/generateData.ts', { stdio: 'inherit' });

  // Step 3: Import the data to Firebase emulators
  console.log('\n📥 Importing data to Firebase emulators...');
  execSync('node src/scripts/dataGeneration/importToEmulators.js', { stdio: 'inherit' });

  console.log('\n✅ Process completed successfully!');
  console.log('\nYou can now start your app with: bun run dev:local');
} catch (error) {
  console.error('\n❌ Error during data generation and import:', error);
  process.exit(1);
}
