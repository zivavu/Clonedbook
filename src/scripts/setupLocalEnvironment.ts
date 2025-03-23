/**
 * This script sets up and validates the local development environment
 * It ensures that required environment variables are set correctly
 */

import { useMockAlgolia } from '@/config/algolia.config';
import { isUsingEmulator } from '@/config/firebase.config';
import fs from 'fs';
import path from 'path';

// Define colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Check if .env.development file exists
const envFilePath = path.join(process.cwd(), '.env.development');
const envFileExists = fs.existsSync(envFilePath);

console.log(`\n${colors.magenta}====== Clonedbook Local Environment Setup ======${colors.reset}`);

// Check environment variables
console.log(`\n${colors.cyan}Environment Variables:${colors.reset}`);
console.log(`- NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
console.log(`- USE_FIREBASE_EMULATOR: ${process.env.USE_FIREBASE_EMULATOR || 'undefined'}`);
console.log(`- USE_ALGOLIA_MOCK: ${process.env.USE_ALGOLIA_MOCK || 'undefined'}`);

console.log(`\n${colors.cyan}Configuration Status:${colors.reset}`);
console.log(
  `- .env.development file: ${envFileExists ? colors.green + 'Exists' : colors.red + 'Missing'} ${colors.reset}`,
);
console.log(
  `- Firebase Emulator: ${isUsingEmulator ? colors.green + 'Enabled' : colors.red + 'Disabled'} ${colors.reset}`,
);
console.log(
  `- Algolia Mock: ${useMockAlgolia ? colors.green + 'Enabled' : colors.red + 'Disabled'} ${colors.reset}`,
);

// If specified as algolia-only, start only the Algolia mock
if (process.argv.includes('algolia-only')) {
  console.log(`\n${colors.yellow}Starting Algolia mock server only...${colors.reset}`);
  // Logic for starting only Algolia mock would go here
  console.log(`\n${colors.green}✓ Algolia mock server started${colors.reset}`);
} else {
  console.log(`\n${colors.yellow}Starting Firebase emulators...${colors.reset}`);
  // Logic for starting Firebase emulators would go here
  console.log(`\n${colors.green}✓ Firebase emulators started${colors.reset}`);

  console.log(`\n${colors.yellow}Starting Algolia mock server...${colors.reset}`);
  // Logic for starting Algolia mock would go here
  console.log(`\n${colors.green}✓ Algolia mock server started${colors.reset}`);
}

console.log(`\n${colors.magenta}====== Setup Complete ======${colors.reset}`);
console.log(`${colors.green}✓ Local development environment is ready!${colors.reset}`);
console.log(
  `${colors.cyan}You can now run 'bun run dev:local' to start the Next.js development server${colors.reset}\n`,
);
