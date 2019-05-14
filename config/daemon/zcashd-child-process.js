// @flow

import cp from 'child_process';
import path from 'path';
import os from 'os';
import fs from 'fs';
import processExists from 'process-exists';
/* eslint-disable import/no-extraneous-dependencies */
import isDev from 'electron-is-dev';
import type { ChildProcess } from 'child_process';
import eres from 'eres';
import uuid from 'uuid/v4';
import findProcess from 'find-process';

/* eslint-disable-next-line import/named */
import { mainWindow } from '../electron';
import waitForDaemonClose from './wait-for-daemon-close';
import getBinariesPath from './get-binaries-path';
import getOsFolder from './get-os-folder';
import getDaemonName from './get-daemon-name';
import fetchParams from './run-fetch-params';
import { locateZcashConf } from './locate-zcash-conf';
import { log } from './logger';
import store from '../electron-store';
import { parseZcashConf, parseCmdArgs, generateArgsFromConf } from './parse-zcash-conf';
import { isTestnet } from '../is-testnet';
import {
  EMBEDDED_DAEMON,
  ZCASH_NETWORK,
  TESTNET,
  MAINNET,
} from '../../app/constants/zcash-network';

const getDaemonOptions = ({
  username, password, useDefaultZcashConf, optionsFromZcashConf,
}) => {
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
    '-server=1',
    '-showmetrics',
    '--metricsui=0',
    '-metricsrefreshtime=1',
    `-rpcuser=${username}`,
    `-rpcpassword=${password}`,
    ...(isTestnet() ? ['-testnet', '-addnode=testnet.z.cash'] : ['-addnode=mainnet.z.cash']),
    // Overwriting the settings with values taken from "zcash.conf"
    ...optionsFromZcashConf,
  ];

  if (useDefaultZcashConf) defaultOptions.push(`-conf=${locateZcashConf()}`);

  return Array.from(new Set([...defaultOptions, ...optionsFromZcashConf]));
};

let resolved = false;

const ZCASHD_PROCESS_NAME = getDaemonName();

let isWindowOpened = false;

const sendToRenderer = (event: string, message: Object, shouldLog: boolean = true) => {
  if (shouldLog) {
    log(message);
  }

  if (isWindowOpened) {
    if (!mainWindow.isDestroyed()) {
      mainWindow.webContents.send(event, message);
    }
  } else {
    const interval = setInterval(() => {
      if (isWindowOpened) {
        mainWindow.webContents.send(event, message);
        clearInterval(interval);
      }
    }, 1000);
  }
};

// eslint-disable-next-line
const runDaemon: () => Promise<?ChildProcess> = () => new Promise(async (resolve, reject) => {
  mainWindow.webContents.on('dom-ready', () => {
    isWindowOpened = true;
  });
  store.delete('rpcport');

  const processName = path.join(getBinariesPath(), getOsFolder(), ZCASHD_PROCESS_NAME);
  const isRelaunch = Boolean(process.argv.find(arg => arg === '--relaunch'));

  if (!mainWindow.isDestroyed()) mainWindow.webContents.send('zcashd-params-download', 'Fetching params...');

  sendToRenderer('zcash-daemon-status', {
    error: false,
    status:
        'Downloading network params, this may take some time depending on your connection speed',
  });

  const [err] = await eres(fetchParams());

  if (err) {
    sendToRenderer('zcash-daemon-status', {
      error: true,
      status: `Error while fetching params: ${err.message}`,
    });

    return reject(new Error(err));
  }

  sendToRenderer('zcash-daemon-status', {
    error: false,
    status: 'Zepio Starting',
  });

  // In case of --relaunch on argv, we need wait to close the old zcash daemon
  // a workaround is use a interval to check if there is a old process running
  if (isRelaunch) {
    await waitForDaemonClose(ZCASHD_PROCESS_NAME);
  }

  const [, isRunning] = await eres(processExists(ZCASHD_PROCESS_NAME));

  // This will parse and save rpcuser and rpcpassword in the store
  let [, optionsFromZcashConf] = await eres(parseZcashConf());

  // if the user has a custom datadir and doesn't have a zcash.conf in that folder,
  // we need to use the default zcash.conf
  let useDefaultZcashConf = false;

  if (optionsFromZcashConf.datadir) {
    const hasDatadirConf = fs.existsSync(path.join(optionsFromZcashConf.datadir, 'zcash.conf'));

    if (hasDatadirConf) {
      optionsFromZcashConf = await parseZcashConf(
        path.join(String(optionsFromZcashConf.datadir), 'zcash.conf'),
      );
    } else {
      useDefaultZcashConf = true;
    }
  }

  if (optionsFromZcashConf.rpcport) store.set('rpcport', optionsFromZcashConf.rpcport);
  if (optionsFromZcashConf.rpcuser) store.set('rpcuser', optionsFromZcashConf.rpcuser);
  if (optionsFromZcashConf.rpcpassword) store.set('rpcpassword', optionsFromZcashConf.rpcpassword);

  if (isRunning) {
    log('Already is running!');

    store.set(EMBEDDED_DAEMON, false);
    // We need grab the rpcuser and rpcpassword from either process args or zcash.conf

    // Command line args override zcash.conf
    const [{ cmd }] = await findProcess('name', ZCASHD_PROCESS_NAME);
    const {
      user, password, port, isTestnet: isTestnetFromCmd,
    } = parseCmdArgs(cmd);

    store.set(
      ZCASH_NETWORK,
      isTestnetFromCmd || optionsFromZcashConf.testnet === '1' ? TESTNET : MAINNET,
    );

    if (user) store.set('rpcuser', user);
    if (password) store.set('rpcpassword', password);
    if (port) store.set('rpcport', port);

    return resolve();
  }

  store.set(EMBEDDED_DAEMON, true);

  if (!isRelaunch) {
    store.set(ZCASH_NETWORK, optionsFromZcashConf.testnet === '1' ? TESTNET : MAINNET);
  }

  if (!optionsFromZcashConf.rpcuser) store.set('rpcuser', uuid());
  if (!optionsFromZcashConf.rpcpassword) store.set('rpcpassword', uuid());

  const rpcCredentials = {
    username: store.get('rpcuser'),
    password: store.get('rpcpassword'),
  };

  if (isDev) log('Rpc Credentials', rpcCredentials);

  const childProcess = cp.spawn(
    processName,
    getDaemonOptions({
      ...rpcCredentials,
      useDefaultZcashConf,
      optionsFromZcashConf: generateArgsFromConf(optionsFromZcashConf),
    }),
    {
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  );

  childProcess.stdout.on('data', (data) => {
    sendToRenderer('zcashd-log', data.toString(), false);
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
