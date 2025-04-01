#!/usr/bin/env node

/**
 * Release Emulator Ports
 *
 * This script forcibly releases all ports used by Firebase emulators
 * to ensure a clean restart without port conflicts.
 */

import { exec } from 'child_process';
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
