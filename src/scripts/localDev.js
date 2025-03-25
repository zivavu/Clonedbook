#!/usr/bin/env node

/**
 * Local Development Helper Script
 *
 * This script displays all the commands needed for local development
 * with Firebase emulators and provides options to run them using an
 * interactive menu interface.
 */

const { exec } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Available commands
const commands = [
  // Setup commands
  {
    id: 'generate',
    name: '📊 Generate test data',
    cmd: 'bun run generate:data',
    category: 'setup',
  },
  {
    id: 'complete-setup',
    name: '🚀 Complete setup workflow (for fresh installs)',
    cmd: 'complete-setup',
    category: 'setup',
  },

  // Emulator commands
  {
    id: 'emulators',
    name: '🔥 Start emulators',
    cmd: 'bun run emulators:start',
    category: 'emulators',
  },
  {
    id: 'emulators-import',
    name: '🔄 Start emulators with data import/export',
    cmd: 'bun run emulators:start:import',
    category: 'emulators',
  },
  {
    id: 'populate-all',
    name: '📥 Populate all data (Firestore, Storage, Algolia)',
    cmd: 'bun run populate:all',
    category: 'emulators',
  },
  {
    id: 'export',
    name: '📤 Export emulator data',
    cmd: 'firebase emulators:export ./firebase-emulator-data',
    category: 'emulators',
  },
  {
    id: 'release-ports',
    name: '🔌 Stop all emulators and release ports',
    cmd: 'bun run release:ports',
    category: 'emulators',
  },

  // Application commands
  {
    id: 'dev',
    name: '🚀 Start Next.js with emulators',
    cmd: 'cross-env NEXT_PUBLIC_USE_EMULATOR=true next dev',
    category: 'app',
  },

  // Utility commands
  { id: 'status', name: '📊 Show development status', cmd: 'show-status', category: 'utility' },
  { id: 'exit', name: '👋 Exit', cmd: null, category: 'utility' },
];

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Display select menu with categories
function displaySelectMenu() {
  console.log('\n\x1b[36m=== Clonedbook Local Development Helper ===\x1b[0m\n');

  // Group commands by category
  const categories = {
    setup: { title: '🔧 Setup', commands: [] },
    emulators: { title: '🔥 Emulators', commands: [] },
    app: { title: '🚀 Application', commands: [] },
    utility: { title: '🛠️ Utilities', commands: [] },
  };

  // Organize commands by category
  commands.forEach((cmd) => {
    if (categories[cmd.category]) {
      categories[cmd.category].commands.push(cmd);
    }
  });

  // Print header
  console.log('Select a command to run:\n');

  // Print categories and commands
  Object.values(categories).forEach((category) => {
    console.log(`\x1b[33m${category.title}\x1b[0m`);

    category.commands.forEach((cmd, index) => {
      console.log(`  ${cmd.id}) ${cmd.name}`);
    });

    console.log('');
  });

  // Print recommended workflow
  console.log('\x1b[33mRecommended workflow:\x1b[0m');
  console.log('• First time setup: Run "complete-setup"');
  console.log('• Daily development:');
  console.log('  1. Run "release-ports" to ensure ports are free');
  console.log('  2. Run "emulators-import" to start emulators with data');
  console.log('  3. Run "dev" to start Next.js with emulator configuration');
  console.log('');
}

// Show development status
function showStatus() {
  console.log('\n\x1b[36m=== Development Environment Status ===\x1b[0m\n');

  // Check for Firebase emulator data
  const emulatorDataDir = path.join(process.cwd(), 'firebase-emulator-data');
  const firestoreExportDir = path.join(emulatorDataDir, 'firestore_export');

  if (fs.existsSync(emulatorDataDir) && fs.existsSync(firestoreExportDir)) {
    console.log('\x1b[32m✓ Firebase emulator data exists\x1b[0m');
  } else {
    console.log('\x1b[31m✗ Firebase emulator data missing\x1b[0m');
    console.log('  Run "populate-all" to populate all data');
    console.log('  Run "export" to export data');
  }

  // Check for test data
  const testDataPath = path.join(process.cwd(), 'src/local/data/firebase-data.json');

  if (fs.existsSync(testDataPath)) {
    const stats = fs.statSync(testDataPath);
    if (stats.size > 100) {
      console.log('\x1b[32m✓ Test data exists\x1b[0m');
    } else {
      console.log('\x1b[31m✗ Test data file exists but appears empty\x1b[0m');
      console.log('  Run "generate" to generate test data');
    }
  } else {
    console.log('\x1b[31m✗ Test data is missing\x1b[0m');
    console.log('  Run "generate" to generate test data');
  }

  // Check if emulators are running
  checkPort('localhost', 4001).then((running) => {
    if (running) {
      console.log('\x1b[32m✓ Firebase emulators are running\x1b[0m');
      console.log('  UI available at: http://localhost:4001');
    } else {
      console.log('\x1b[31m✗ Firebase emulators are not running\x1b[0m');
      console.log('  Run "emulators-import" to start emulators with data');
    }

    // Check if Next.js is running
    checkPort('localhost', 3000).then((running) => {
      if (running) {
        console.log('\x1b[32m✓ Next.js development server is running\x1b[0m');
        console.log('  App available at: http://localhost:3000');
      } else {
        console.log('\x1b[31m✗ Next.js development server is not running\x1b[0m');
        console.log('  Run "dev" to start Next.js with emulators');
      }

      console.log('\n\x1b[36m=== Summary ===\x1b[0m');
      console.log('To start development:');
      console.log('1. Run "emulators-import" to start emulators with data import/export');
      console.log('2. Run "dev" to start Next.js with emulator configuration');

      promptUser();
    });
  });
}

// Run the complete setup workflow
async function runCompleteSetup() {
  console.log('\n\x1b[36m=== Starting Complete Setup Workflow ===\x1b[0m\n');
  console.log('This will set up everything you need for local development.');
  console.log('The process will take a few minutes to complete.');

  const steps = [
    {
      name: 'Generate test data',
      cmd: 'bun run generate:data',
    },
    {
      name: 'Release all ports',
      cmd: 'bun run release:ports',
    },
    {
      name: 'Start Firebase emulators',
      cmd: 'firebase emulators:start --project=demo-project',
      isBackground: true,
      waitForPort: 4001,
      waitTime: 10000,
    },
    {
      name: 'Wait for emulators to start',
      cmd: 'timeout /t 5',
    },
    {
      name: 'Populate all data (Firestore, Storage, Algolia)',
      cmd: 'bun run populate:all',
    },
    {
      name: 'Export emulator data',
      cmd: 'firebase emulators:export ./firebase-emulator-data',
    },
    {
      name: 'Stop running emulators',
      cmd: 'bun run release:ports',
    },
    {
      name: 'Restart emulators with data import/export',
      cmd: 'firebase emulators:start --project=demo-project --import=./firebase-emulator-data --export-on-exit=./firebase-emulator-data',
      isBackground: true,
      waitForPort: 4001,
      waitTime: 10000,
    },
    {
      name: 'Wait for emulators to restart',
      cmd: 'timeout /t 5',
    },
  ];

  let backgroundProcess = null;

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    console.log(`\n\x1b[36m[Step ${i + 1}/${steps.length}] ${step.name}...\x1b[0m`);

    if (step.isBackground) {
      // Kill existing background process if any
      if (backgroundProcess) {
        try {
          process.kill(backgroundProcess.pid);
        } catch (error) {
          // Ignore errors
        }
      }

      console.log(`Running in background: ${step.cmd}`);
      backgroundProcess = exec(step.cmd);

      // Wait for port to be available
      if (step.waitForPort) {
        console.log(`Waiting for port ${step.waitForPort} to be available...`);
        await new Promise((resolve) => setTimeout(resolve, step.waitTime || 5000));
      }

      continue;
    }

    try {
      const { stdout, stderr } = await new Promise((resolve, reject) => {
        exec(step.cmd, (error, stdout, stderr) => {
          if (error && !step.ignoreError) {
            reject(error);
            return;
          }
          resolve({ stdout, stderr });
        });
      });

      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);

      console.log(`\x1b[32m✓ ${step.name} completed\x1b[0m`);
    } catch (error) {
      console.error(`\x1b[31m✗ Error during "${step.name}": ${error.message}\x1b[0m`);

      if (!step.ignoreError) {
        console.log('\nSetup workflow stopped due to an error.');
        console.log('Please fix the issue and try again.');
        break;
      }
    }
  }

  console.log('\n\x1b[36m=== Setup Workflow Completed ===\x1b[0m');
  console.log('\n\x1b[32mYou can now:\x1b[0m');
  console.log('1. Run the app with: "dev"');
  console.log('2. Access Firebase Emulator UI at: http://localhost:4001');
  console.log('3. Access your app at: http://localhost:3000');

  promptUser();
}

// Check if a port is in use (service is running)
function checkPort(host, port) {
  return new Promise((resolve) => {
    // First check if we can make an HTTP request to the port
    // This is more accurate for checking if a service is actually responding
    const http = require('http');
    const req = http.request(
      {
        method: 'HEAD',
        host: host,
        port: port,
        timeout: 2000,
      },
      (res) => {
        // If we get a response, the service is running
        resolve(true);
      },
    );

    req.on('error', () => {
      // If we can't connect via HTTP, try a simple TCP connection test
      const net = require('net');
      const socket = new net.Socket();
      socket.setTimeout(1000);

      socket.on('connect', () => {
        socket.destroy();
        // Port is in use, but not responding to HTTP requests
        resolve(true);
      });

      socket.on('timeout', () => {
        socket.destroy();
        resolve(false);
      });

      socket.on('error', () => {
        socket.destroy();
        resolve(false);
      });

      socket.connect(port, host);
    });

    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

// Run selected command
function runCommand(commandId) {
  const command = commands.find((cmd) => cmd.id === commandId);

  if (!command) {
    console.log('\x1b[31mInvalid command ID. Please try again.\x1b[0m');
    promptUser();
    return;
  }

  if (command.id === 'exit') {
    console.log('Exiting...');
    rl.close();
    return;
  }

  if (command.cmd === 'complete-setup') {
    runCompleteSetup();
    return;
  }

  if (command.cmd === 'show-status') {
    showStatus();
    return;
  }

  if (command.id === 'release-ports') {
    runReleasePortsCommand();
    return;
  }

  console.log(`\n\x1b[36mRunning: ${command.cmd}\x1b[0m\n`);

  const process = exec(command.cmd);

  process.stdout.on('data', (data) => {
    console.log(data);
  });

  process.stderr.on('data', (data) => {
    console.error(data);
  });

  process.on('close', (code) => {
    console.log(
      `\n\x1b[${code === 0 ? '32' : '31'}mCommand completed with exit code ${code}\x1b[0m`,
    );
    promptUser();
  });
}

// Release ports command
async function runReleasePortsCommand() {
  console.log('\n\x1b[36m=== Stopping Emulators and Releasing Ports ===\x1b[0m\n');

  try {
    // Use multiple methods to ensure all processes are terminated
    console.log('Releasing ports using multiple methods...');

    // 1. Use kill-port
    console.log('1. Using kill-port to release all ports...');
    try {
      await execPromise(
        'npx kill-port 4000 4001 4400 4401 4500 4501 8080 8081 9000 9099 9199 9299',
      );
      console.log('\x1b[32m✓ kill-port completed\x1b[0m');
    } catch (error) {
      console.log('\x1b[33m- kill-port failed, trying alternative methods\x1b[0m');
    }

    // 2. Use Firebase CLI stop command
    console.log('2. Using Firebase CLI stop command...');
    try {
      await execPromise('firebase emulators:stop');
      console.log('\x1b[32m✓ Firebase emulators stop command completed\x1b[0m');
    } catch (error) {
      console.log('\x1b[33m- Firebase stop command failed or not available\x1b[0m');
    }

    // 3. Windows-specific commands
    if (process.platform === 'win32') {
      console.log('3. Using Windows-specific commands...');
      try {
        // Find and kill Java processes (Firebase emulators run on Java)
        await execPromise('taskkill /F /IM java.exe');
        console.log('\x1b[32m✓ Killed Java processes\x1b[0m');
      } catch (error) {
        console.log('\x1b[33m- No Java processes found or unable to kill them\x1b[0m');
      }
    }

    console.log('\n\x1b[32m✓ All ports released successfully!\x1b[0m');
  } catch (error) {
    console.error(`\x1b[31m✗ Error stopping emulators: ${error.message}\x1b[0m`);
  }

  console.log('\n\x1b[36m=== Emulator Cleanup Complete ===\x1b[0m');
  promptUser();
}

// Helper function to promisify exec
function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error && error.code !== 1) {
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

// Prompt for user input
function promptUser() {
  displaySelectMenu();
  rl.question('\x1b[36mEnter command ID: \x1b[0m', (answer) => {
    runCommand(answer.trim());
  });
}

// Start the script
console.clear();
console.log('\x1b[36m======================================\x1b[0m');
console.log('\x1b[36m  Clonedbook Local Development Tools  \x1b[0m');
console.log('\x1b[36m======================================\x1b[0m');
promptUser();
