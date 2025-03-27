import { exec } from 'child_process';

function killProcessOnPort(port: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const command =
      process.platform === 'win32' ? `netstat -ano | findstr :${port}` : `lsof -i :${port} -t`;

    exec(command, (error, stdout) => {
      if (error) {
        console.log(`No process found on port ${port}`);
        resolve();
        return;
      }

      const pid =
        process.platform === 'win32'
          ? stdout.split('\n')[0]?.trim()?.split(/\s+/)?.[4]
          : stdout.trim();

      if (pid && pid !== '0') {
        // Skip system process (PID 0)
        const killCommand =
          process.platform === 'win32' ? `taskkill /F /PID ${pid}` : `kill -9 ${pid}`;

        exec(killCommand, (killError) => {
          if (killError) {
            console.log(`Process on port ${port} could not be killed (might be a system process)`);
            resolve(); // Don't reject, just resolve as this might be expected
          } else {
            console.log(`Killed process on port ${port}`);
            resolve();
          }
        });
      } else {
        console.log(`Skipping system process on port ${port}`);
        resolve();
      }
    });
  });
}

async function cleanup(): Promise<void> {
  const ports = [9099, 8080, 9199, 9000, 5001];

  console.log('Cleaning up existing processes...');

  try {
    await Promise.all(ports.map((port) => killProcessOnPort(port)));
    console.log('Cleanup completed successfully');
  } catch (error) {
    console.log('Cleanup completed with some warnings (this is normal)');
  }
}

cleanup();
