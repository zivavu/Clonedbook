#!/usr/bin/env node

/**
 * Release Emulator Ports
 *
 * This script forcibly releases all ports used by Firebase emulators
 * to ensure a clean restart without port conflicts.
 */

import { exec } from 'child_process';
import killPort from 'kill-port';
import { emulatorHosts } from '../config/env';

interface EmulatorPort {
  port: number;
  name: string;
}

// Extract port numbers from emulatorHosts config
const getPortFromHost = (host: string): number => {
  const parts = host.split(':');
  return parts.length > 1 ? parseInt(parts[1], 10) : 0;
};

// List of ports used by Firebase emulators
const ports: EmulatorPort[] = [
  { port: 4000, name: 'Emulator UI' },
  { port: 4400, name: 'Emulator Hub' },
  { port: getPortFromHost(emulatorHosts.firestore), name: 'Firestore Emulator' },
  { port: getPortFromHost(emulatorHosts.storage), name: 'Storage Emulator' },
  { port: 4500, name: 'Logging Emulator' },
  { port: 9150, name: 'Firestore Websocket' },
];

// Helper function to promisify exec
function execPromise(command: string): Promise<{ stdout: string; stderr: string }> {
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

// Release a single port
const releasePort = async (port: number, name: string): Promise<void> => {
  try {
    console.log(`Attempting to release ${name} on port ${port}...`);
    await killPort(port);
    console.log(`✅ Port ${port} (${name}) released successfully`);
  } catch (error) {
    console.log(`ℹ️ Port ${port} (${name}) was not in use or couldn't be released`);
  }
};

// Release all emulator ports
const releaseAllPorts = async (): Promise<void> => {
  console.log('🔥 Firebase Emulator Port Release 🔥');
  console.log('===================================');
  console.log('Releasing all Firebase emulator ports...');

  for (const { port, name } of ports) {
    if (port > 0) {
      await releasePort(port, name);
    }
  }

  console.log('===================================');
  console.log('✅ All emulator ports released');
  console.log('You can now start the emulators with:');
  console.log('firebase emulators:start --only firestore,storage');
};

// Execute the script
releaseAllPorts().catch((error) => {
  console.error('❌ Error releasing ports:', error);
  process.exit(1);
});
