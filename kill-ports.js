/**
 * Utility script to find and kill processes using specific ports
 * Usage: node kill-ports.js
 */
const { exec } = require('child_process');

// Ports to check and potentially kill
const portsToCheck = [8080, 8081, 9000, 9001, 9099, 9199, 4000];

// Function to find what process is using a port (Windows)
function findProcessOnPort(port) {
  return new Promise((resolve, reject) => {
    const command = `netstat -ano | findstr :${port}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        // If error, likely nothing using the port
        resolve({ port, pid: null, inUse: false });
        return;
      }

      if (stdout) {
        // Parse the output to extract PID
        const lines = stdout.trim().split('\n');
        if (lines.length > 0) {
          const match = lines[0].match(/\s+(\d+)$/);
          if (match && match[1]) {
            resolve({ port, pid: match[1], inUse: true });
            return;
          }
        }
      }

      resolve({ port, pid: null, inUse: false });
    });
  });
}

// Function to kill a process by PID (Windows)
function killProcess(pid) {
  return new Promise((resolve, reject) => {
    const command = `taskkill /F /PID ${pid}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Failed to kill process ${pid}: ${error.message}`));
        return;
      }
      resolve(stdout);
    });
  });
}

// Main function to check and kill ports
async function checkAndKillPorts() {
  console.log('Checking for processes using emulator ports...');

  for (const port of portsToCheck) {
    try {
      const result = await findProcessOnPort(port);

      if (result.inUse && result.pid) {
        console.log(`Port ${port} is in use by process ID ${result.pid}`);

        // Prompt before killing
        const shouldKill = await promptToKill(port, result.pid);

        if (shouldKill) {
          try {
            await killProcess(result.pid);
            console.log(`✅ Successfully killed process ${result.pid} using port ${port}`);
          } catch (killError) {
            console.error(`❌ Failed to kill process: ${killError.message}`);
          }
        }
      } else {
        console.log(`Port ${port} is free`);
      }
    } catch (error) {
      console.error(`Error checking port ${port}: ${error.message}`);
    }
  }

  console.log('\nPort check complete. You can now try starting the emulators again.');
}

// Simple prompt function
function promptToKill(port, pid) {
  return new Promise((resolve) => {
    // Auto-kill for simplicity in this script
    console.log(`Automatically killing process ${pid} on port ${port}...`);
    resolve(true);
  });
}

// Run the script
checkAndKillPorts();
