// @flow
import cp from 'child_process';
import path from 'path';
import processExists from 'process-exists';
import type { ChildProcess } from 'child_process';

import getBinariesPath from './get-binaries-path';
import getDaemonName from './get-daemon-name';
import fetchParams from './run-fetch-params';
import log from './logger';

const runDaemon: () => Promise<?ChildProcess> = () => new Promise((resolve, reject) => {
  const processName = path.join(getBinariesPath(), getDaemonName());

  fetchParams()
    .then(() => {
      log('Fetch Params finished!');
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
    })
    .catch((err) => {
      log('Something went wrong fetching params: ', err);
    });
});

export default runDaemon;
