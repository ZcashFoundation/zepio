// @flow
import cp from 'child_process';
import path from 'path';
import processExists from 'process-exists';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import isDev from 'electron-is-dev';
import type { ChildProcess } from 'child_process';
import eres from 'eres';

import getBinariesPath from './get-binaries-path';
import getOsFolder from './get-os-folder';
import getDaemonName from './get-daemon-name';
import fetchParams from './run-fetch-params';
import log from './logger';

const getDaemonOptions = () => (isDev ? ['-daemon', '-testnet'] : ['-daemon']);

const runDaemon: () => Promise<?ChildProcess> = () => new Promise(async (resolve, reject) => {
  const processName = path.join(getBinariesPath(), getOsFolder(), getDaemonName());

  const [err] = await eres(fetchParams());

  if (err) {
    log('Something went wrong fetching params: ', err);
    return reject(new Error(err));
  }

  log('Fetch Params finished!');

  const [, isRunning] = await eres(processExists(processName));

  if (isRunning) {
    log('Already is running!');
    return resolve();
  }

  const childProcess = cp.spawn(processName, getDaemonOptions());

  childProcess.stdout.on('data', (data) => {
    log(data.toString());
    resolve(childProcess);
  });

  childProcess.stderr.on('data', (data) => {
    log(data.toString());
    reject(new Error(data.toString()));
  });

  childProcess.on('error', reject);
});

export default runDaemon;
