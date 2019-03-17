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
import findProcess from 'find-process';
/* eslint-disable-next-line import/named */
import { mainWindow } from '../electron';

import getBinariesPath from './get-binaries-path';
import getOsFolder from './get-os-folder';
import getDaemonName from './get-daemon-name';
import fetchParams from './run-fetch-params';
import log from './logger';
import store from '../electron-store';
import { parseZcashConf, parseCmdArgs, generateArgsFromConf } from './parse-zcash-conf';
import { isTestnet } from '../is-testnet';
import {
  EMBEDDED_DAEMON,
  ZCASH_NETWORK,
  TESTNET,
  MAINNET,
} from '../../app/constants/zcash-network';

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
    ...(isTestnet ? ['-testnet', '-addnode=testnet.z.cash'] : ['-addnode=mainnet.z.cash']),
    // Overwriting the settings with values taken from "zcash.conf"
    ...optionsFromZcashConf,
  ];

  return Array.from(new Set([...defaultOptions, ...optionsFromZcashConf]));
};

let resolved = false;

const ZCASHD_PROCESS_NAME = getDaemonName();

// eslint-disable-next-line
const runDaemon: () => Promise<?ChildProcess> = () => new Promise(async (resolve, reject) => {
  const processName = path.join(getBinariesPath(), getOsFolder(), ZCASHD_PROCESS_NAME);

  if (!mainWindow.isDestroyed()) mainWindow.webContents.send('zcashd-params-download', 'Fetching params...');

  const [err] = await eres(fetchParams());

  if (err) {
    log('Something went wrong fetching params: ', err);
    return reject(new Error(err));
  }

  if (!mainWindow.isDestroyed()) mainWindow.webContents.send('zcashd-params-download', 'ZEC Wallet Starting');
  log('Fetch Params finished!');

  const [, isRunning] = await eres(processExists(ZCASHD_PROCESS_NAME));

  // This will parse and save rpcuser and rpcpassword in the store
  const [, optionsFromZcashConf] = await eres(parseZcashConf());

  if (optionsFromZcashConf.rpcuser) store.set('rpcuser', optionsFromZcashConf.rpcuser);
  if (optionsFromZcashConf.rpcpassword) store.set('rpcpassword', optionsFromZcashConf.rpcpassword);

  if (isRunning) {
    log('Already is running!');

    store.set(EMBEDDED_DAEMON, false);
    // We need grab the rpcuser and rpcpassword from either process args or zcash.conf

    // Command line args override zcash.conf
    const [{ cmd }] = await findProcess('name', ZCASHD_PROCESS_NAME);
    const { user, password, isTestnet: isTestnetFromCmd } = parseCmdArgs(cmd);

    store.set(
      ZCASH_NETWORK,
      isTestnetFromCmd || optionsFromZcashConf.testnet === '1' ? TESTNET : MAINNET,
    );

    if (user) store.set('rpcuser', user);
    if (password) store.set('rpcpassword', password);

    return resolve();
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
    await getDaemonOptions({
      ...rpcCredentials,
      optionsFromZcashConf: generateArgsFromConf(optionsFromZcashConf),
    }),
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
