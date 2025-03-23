// Simple script to check environment variables in Node.js
// Run this with: node check-env.js

console.log('Environment Variables Check:');
console.log('----------------------------');
console.log('NODE_ENV =', process.env.NODE_ENV || 'undefined');
console.log('USE_FIREBASE_EMULATOR =', process.env.USE_FIREBASE_EMULATOR || 'undefined');
console.log('USE_ALGOLIA_MOCK =', process.env.USE_ALGOLIA_MOCK || 'undefined');
console.log('----------------------------');

if (
  process.env.NODE_ENV === 'development' &&
  process.env.USE_FIREBASE_EMULATOR === 'true' &&
  process.env.USE_ALGOLIA_MOCK === 'true'
) {
  console.log('✅ All required environment variables are set correctly for local development!');
  process.exit(0);
} else {
  console.log('❌ Environment variables are not set correctly for local development!');
  console.log('Make sure you run the app with: bun run dev:local');
  process.exit(1);
}
