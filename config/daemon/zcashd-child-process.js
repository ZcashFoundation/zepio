// @flow

import cp from 'child_process';
import path from 'path';
import os from 'os';
import processExists from 'process-exists';
/* eslint-disable import/no-extraneous-dependencies */
import isDev from 'electron-is-dev';
import type { ChildProcess } from 'child_process';
import eres from 'eres';
import uuid from 'uuid/v4';
/* eslint-disable-next-line import/named */
import { mainWindow } from '../electron';

import getBinariesPath from './get-binaries-path';
import getOsFolder from './get-os-folder';
import getDaemonName from './get-daemon-name';
import fetchParams from './run-fetch-params';
import log from './logger';
import store from '../electron-store';
import { parseZcashConf } from './parse-zcash-conf';

const getDaemonOptions = ({ username, password, optionsFromZcashConf }) => {
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
    '-metricsrefreshtime=1',
    `-rpcuser=${username}`,
    `-rpcpassword=${password}`,
    // TODO: For test purposes only
    '-testnet',
    '-addnode=testnet.z.cash',
    // Overwriting the settings with values taken from "zcash.conf"
    ...optionsFromZcashConf,
  ];

  return isDev ? defaultOptions.concat(['-testnet', '-addnode=testnet.z.cash']) : defaultOptions;
};

let resolved = false;

// eslint-disable-next-line
const runDaemon: () => Promise<?ChildProcess> = () => new Promise(async (resolve, reject) => {
  const processName = path.join(getBinariesPath(), getOsFolder(), getDaemonName());

  if (!mainWindow.isDestroyed()) mainWindow.webContents.send('zcashd-params-download', 'Fetching params...');

  const [err] = await eres(fetchParams());

  if (err) {
    log('Something went wrong fetching params: ', err);
    return reject(new Error(err));
  }

  if (!mainWindow.isDestroyed()) mainWindow.webContents.send('zcashd-params-download', 'ZEC Wallet Starting');
  log('Fetch Params finished!');

  const [, isRunning] = await eres(processExists(processName));

  if (isRunning) {
    log('Already is running!');
    return resolve();
  }

  const [, optionsFromZcashConf = []] = await eres(parseZcashConf());

  const hasCredentials = store.has('rpcuser') && store.has('rpcpassword');

  const rpcCredentials = hasCredentials
    ? {
      username: store.get('rpcuser'),
      password: store.get('rpcpassword'),
    }
    : {
      username: uuid(),
      password: uuid(),
    };

  if (isDev) log('Rpc Credentials', rpcCredentials);

  if (!hasCredentials) {
    store.set('rpcuser', rpcCredentials.username);
    store.set('rpcpassword', rpcCredentials.password);
  }

  const childProcess = cp.spawn(
    processName,
    await getDaemonOptions({ ...rpcCredentials, optionsFromZcashConf }),
    {
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  );

  childProcess.stdout.on('data', (data) => {
    if (!mainWindow.isDestroyed()) mainWindow.webContents.send('zcashd-log', data.toString());
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

// eslint-disable-next-line
export default runDaemon;
