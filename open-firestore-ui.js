/**
 * Helper script to open Firestore UI in the browser
 * Run with: node open-firestore-ui.js
 */
const { exec } = require('child_process');
const http = require('http');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

// URLs to check and open
const urls = [
  {
    name: 'Firebase Emulator Suite UI',
    url: 'http://localhost:4000/firestore',
    checkUrl: 'http://localhost:4000',
  },
  {
    name: 'Direct Firestore UI',
    url: 'http://localhost:8081/firestore',
    checkUrl: 'http://localhost:8081',
  },
];

// Function to check if a URL is available
function checkUrlAvailable(url) {
  return new Promise((resolve) => {
    http
      .get(url, (res) => {
        if (res.statusCode === 200) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .on('error', () => {
        resolve(false);
      });
  });
}

// Function to open URL in browser
function openBrowser(url) {
  const command =
    process.platform === 'win32'
      ? `start "" "${url}"`
      : process.platform === 'darwin'
        ? `open "${url}"`
        : `xdg-open "${url}"`;

  exec(command, (error) => {
    if (error) {
      console.log(`${colors.red}Failed to open browser: ${error.message}${colors.reset}`);
    } else {
      console.log(`${colors.green}Browser opened to: ${url}${colors.reset}`);
    }
  });
}

// Main function
async function main() {
  console.log(`${colors.blue}Checking Firestore UI availability...${colors.reset}`);

  let anyAvailable = false;

  for (const item of urls) {
    const available = await checkUrlAvailable(item.checkUrl);

    if (available) {
      console.log(`${colors.green}✓ ${item.name} is available${colors.reset}`);
      anyAvailable = true;

      // Ask user if they want to open this UI
      console.log(`${colors.yellow}Opening ${item.name} in your browser...${colors.reset}`);
      openBrowser(item.url);

      // Small delay between opening browsers
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else {
      console.log(`${colors.red}✗ ${item.name} is not available${colors.reset}`);
    }
  }

  if (!anyAvailable) {
    console.log(`${colors.red}No Firestore UIs are available!${colors.reset}`);
    console.log(`${colors.yellow}Make sure the Firebase emulator is running with:${colors.reset}`);
    console.log(`firebase emulators:start`);
  } else {
    console.log(`${colors.blue}Browser windows should be opening...${colors.reset}`);
    console.log(`${colors.yellow}If you're having trouble seeing data:${colors.reset}`);
    console.log(
      `1. Try using the Raw API URL: http://localhost:8081/v1/projects/demo-clonedbook/databases/(default)/documents`,
    );
    console.log(`2. Refresh the browser cache (Ctrl+F5)`);
    console.log(`3. Verify the project ID is correctly set to 'demo-clonedbook'`);
  }
}

main();
