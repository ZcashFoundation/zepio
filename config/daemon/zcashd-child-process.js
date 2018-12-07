// @flow
import cp from 'child_process';
import path from 'path';
import os from 'os';
import processExists from 'process-exists';
/* eslint-disable import/no-extraneous-dependencies */
import isDev from 'electron-is-dev';
import type { ChildProcess } from 'child_process';
import eres from 'eres';
/* eslint-disable-next-line import/named */
import { mainWindow } from '../electron';

import getBinariesPath from './get-binaries-path';
import getOsFolder from './get-os-folder';
import getDaemonName from './get-daemon-name';
import fetchParams from './run-fetch-params';
import log from './logger';
import store from '../electron-store';
import generateRandomString from './generate-random-string';

const getDaemonOptions = ({ username, password }) => {
  /*
    -showmetrics
        Show metrics on stdout
    -metricsui
        Set to 1 for a persistent metrics screen, 0 for sequential metrics
        output
    -metricsrefreshtime
        Number of seconds between metrics refreshes
  */
  const defaultOptions = [
    '-showmetrics',
    '--metricsui=0',
    '-metricsrefreshtime=3',
    `-rpcuser=${username}`,
    `-rpcpassword=${password}`,
  ];
  return isDev ? defaultOptions.concat(['-testnet', '-addnode=testnet.z.cash']) : defaultOptions;
};

let resolved = false;

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

  const hasCredentials = store.has('rpcuser') && store.has('rpcpassword');

  const rpcCredentials = hasCredentials
    ? {
      username: store.get('rpcuser'),
      password: store.get('rpcpassword'),
    }
    : {
      username: generateRandomString(),
      password: generateRandomString(),
    };

  if (!hasCredentials) {
    store.set('rpcuser', rpcCredentials.username);
    store.set('rpcpassword', rpcCredentials.password);
  }

  const childProcess = cp.spawn(processName, getDaemonOptions(rpcCredentials), {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  childProcess.stdout.on('data', (data) => {
    if (mainWindow) mainWindow.webContents.send('zcashd-log', data.toString());
    if (!resolved) {
      resolve(childProcess);
      resolved = true;
    }
  });

  childProcess.stderr.on('data', (data) => {
    log(data.toString());
    reject(new Error(data.toString()));
  });

  childProcess.on('error', reject);

  if (os.platform() === 'win32') {
    resolved = true;
    resolve(childProcess);
  }
});

export default runDaemon;
