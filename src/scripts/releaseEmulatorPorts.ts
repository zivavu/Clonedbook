#!/usr/bin/env node

/**
 * Release Emulator Ports
 *
 * This script forcibly releases all ports used by Firebase emulators
 * to ensure a clean restart without port conflicts.
 */

import { exec } from 'child_process';
import net from 'net';

interface EmulatorPort {
  port: number;
  name: string;
}

// List of ports used by Firebase emulators
const ports: EmulatorPort[] = [
  { port: 4001, name: 'Emulator UI' },
  { port: 4401, name: 'Emulator Hub' },
  { port: 8080, name: 'Firestore Emulator' },
  { port: 9199, name: 'Storage Emulator' },
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

// Check if a port is in use
async function isPortInUse(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(500);

    socket.on('connect', () => {
      socket.destroy();
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

    socket.connect(port, 'localhost');
  });
}

// Main function
async function releaseEmulatorPorts(): Promise<void> {
  console.log('\nChecking for ports in use...');

  // First check which ports are actually in use
  const portsInUse: EmulatorPort[] = [];
  for (const { port, name } of ports) {
    const inUse = await isPortInUse(port);
    if (inUse) {
      portsInUse.push({ port, name });
    }
  }

  if (portsInUse.length === 0) {
    console.log('\n✓ No emulator ports are currently in use. Nothing to do.');
    return;
  }

  console.log('\nAttempting to forcibly release ALL emulator ports...\n');

  // Method 1: Use kill-port
  console.log('Method 1: Using kill-port...');
  try {
    const portList = ports.map((p) => p.port).join(' ');
    await execPromise(`npx kill-port ${portList}`);
    console.log('✓ kill-port command executed');
  } catch (error) {
    console.log('✗ kill-port failed:', (error as Error).message);
  }

  // Method 2: Use Firebase CLI stop command
  console.log('\nMethod 2: Using Firebase CLI...');
  try {
    await execPromise('firebase emulators:stop');
    console.log('✓ firebase emulators:stop command executed');
  } catch (error) {
    console.log('✗ firebase emulators:stop failed:', (error as Error).message);
  }

  // Method 3: Platform-specific commands
  console.log('\nMethod 3: Windows-specific cleanup...');
  if (process.platform === 'win32') {
    // Windows: Kill Java processes
    console.log('Killing Java processes (Firebase emulators run on Java)...');
    try {
      await execPromise('taskkill /F /IM java.exe');
      console.log('✓ Killed Java processes');
    } catch (error) {
      console.log('✗ No Java processes found or unable to kill them');
    }

    // Windows: Kill Node processes with emulator in the title
    console.log('Killing Node processes with emulator in the title...');
    try {
      await execPromise('taskkill /F /FI "WINDOWTITLE eq *emulator*"');
      console.log('✓ Killed Node processes with emulator in the title');
    } catch (error) {
      console.log('✗ No matching Node processes found');
    }
  } else {
    // Unix: Use pkill
    try {
      await execPromise('pkill -f "firebase.*emulators"');
      console.log('✓ Killed Firebase emulator processes');
    } catch (error) {
      console.log('✗ No matching processes found');
    }
  }

  // Verify ports are now free
  console.log('\nVerifying ports are now free...');
  let allPortsFree = true;

  for (const { port, name } of ports) {
    const inUse = await isPortInUse(port);
    if (inUse) {
      console.log(`✗ Port ${port} (${name}) is still in use`);
      allPortsFree = false;
    } else {
      console.log(`✓ Port ${port} (${name}) is now free`);
    }
  }

  if (allPortsFree) {
    console.log('\n✓ SUCCESS: All Firebase emulator ports have been released!');
  } else {
    console.log('\n⚠️ WARNING: Some ports are still in use.');
    console.log('Try closing any terminal windows running Firebase emulators.');
    console.log('If problems persist, you may need to restart your computer.');
  }
}

releaseEmulatorPorts();
