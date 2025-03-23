/**
 * This script verifies that Next.js is receiving the correct environment variables.
 * It can be run directly or incorporated into your Next.js build/dev scripts.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

console.log(
  `${colors.magenta}===== Next.js Environment Variable Verification =====${colors.reset}`,
);

// Check if .env.development exists
const envDevPath = path.join(process.cwd(), '.env.development');
const envDevExists = fs.existsSync(envDevPath);
console.log(
  `${colors.cyan}Checking .env.development file:${colors.reset} ${envDevExists ? colors.green + 'Exists' : colors.red + 'Missing'} ${colors.reset}`,
);

// Check if .env.local exists
const envLocalPath = path.join(process.cwd(), '.env.local');
const envLocalExists = fs.existsSync(envLocalPath);
console.log(
  `${colors.cyan}Checking .env.local file:${colors.reset} ${envLocalExists ? colors.green + 'Exists' : colors.red + 'Missing'} ${colors.reset}`,
);

// Check current environment variables
console.log(`\n${colors.cyan}Current Environment Variables:${colors.reset}`);
console.log(`- NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
console.log(`- USE_FIREBASE_EMULATOR: ${process.env.USE_FIREBASE_EMULATOR || 'undefined'}`);
console.log(`- USE_ALGOLIA_MOCK: ${process.env.USE_ALGOLIA_MOCK || 'undefined'}`);

// Suggest solutions
console.log(`\n${colors.yellow}To resolve environment variable issues:${colors.reset}`);
console.log(
  `1. Make sure you're running the app with: ${colors.green}bun run dev:local${colors.reset}`,
);
console.log(`2. Verify that your package.json has the correct dev:local script:`);
console.log(
  `   ${colors.green}"dev:local": "cross-env NODE_ENV=development USE_ALGOLIA_MOCK=true USE_FIREBASE_EMULATOR=true next dev"${colors.reset}`,
);
console.log(`3. Ensure your .env.development file contains the necessary variables`);
console.log(
  `4. Try running: ${colors.green}cross-env NODE_ENV=development USE_ALGOLIA_MOCK=true USE_FIREBASE_EMULATOR=true node -e "console.log(process.env)"${colors.reset}`,
);

console.log(`\n${colors.magenta}============================================${colors.reset}`);

// Attempt to execute the command to see if cross-env works
try {
  console.log(`\n${colors.cyan}Testing cross-env functionality:${colors.reset}`);
  const testEnv = execSync('cross-env NODE_ENV=test-value echo %NODE_ENV%').toString().trim();
  console.log(
    `- cross-env test result: ${testEnv === 'test-value' ? colors.green + 'Working' : colors.red + 'Not working properly'} ${colors.reset}`,
  );
} catch (error) {
  console.log(
    `- cross-env test result: ${colors.red}Failed - make sure cross-env is installed${colors.reset}`,
  );
}
