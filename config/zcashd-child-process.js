// @flow
import cp from 'child_process';
import processExists from 'process-exists';
import type { ChildProcess } from 'child_process';

const getProcessName = () => 'zcashd';

/* eslint-disable no-console */
export const log = (...message: Array<*>) => console.log('[ZCash Daemon]', ...message);
/* eslint-enable no-console */

export const runDaemon: () => Promise<?ChildProcess> = () => new Promise((resolve, reject) => {
  const processName = getProcessName();

  processExists(processName).then((isRunning) => {
    if (isRunning) {
      log('Already is running!');
      resolve();
    } else {
      const childProcess = cp.spawn(processName, ['-daemon']);

      childProcess.stdout.on('data', (data) => {
        log(data.toString());
        resolve(childProcess);
      });

      childProcess.stderr.on('data', (data) => {
        log(data.toString());
        reject(new Error(data.toString()));
      });

      childProcess.on('error', reject);
    }
  });
});
