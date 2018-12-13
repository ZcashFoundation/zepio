// @flow
import '@babel/polyfill';

import path from 'path';

/* eslint-disable import/no-extraneous-dependencies */
import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import isDev from 'electron-is-dev';
/* eslint-enable import/no-extraneous-dependencies */
import type { BrowserWindow as BrowserWindowType } from 'electron';
import eres from 'eres';
import { registerDebugShortcut } from '../utils/debug-shortcut';
import runDaemon from './daemon/zcashd-child-process';
import zcashLog from './daemon/logger';
import getZecPrice from '../services/zec-price';
import store from './electron-store';

let mainWindow: BrowserWindowType;
let updateAvailable: boolean = false;
let zcashDaemon;

const showStatus = (text) => {
  if (text === 'Update downloaded') updateAvailable = true;

  mainWindow.webContents.send('update', {
    updateAvailable,
    updateInfo: text,
  });
};

const createWindow = () => {
  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on('checking-for-update', () => showStatus('Checking for update'));
  autoUpdater.on('update-available', () => showStatus('Update available'));
  autoUpdater.on('update-not-available', () => showStatus('No updates available'));
  autoUpdater.on('error', err => showStatus(`Error while updating: ${err}`));

  autoUpdater.on('download-progress', progress => showStatus(
    /* eslint-disable-next-line max-len */
    `Download speed: ${progress.bytesPerSecond} - Downloaded ${progress.percent}% (${progress.transferred}/${
      progress.total
    })`,
  ));
  autoUpdater.on('update-downloaded', () => {
    updateAvailable = true;
    showStatus('Update downloaded');
  });

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: false,
    frame: true,
    resizable: true,
    webPreferences: {
      devTools: true,
      webSecurity: false,
    },
  });

  getZecPrice().then((obj) => {
    store.set('ZEC_DOLLAR_PRICE', obj.USD);
  });

  mainWindow.setVisibleOnAllWorkspaces(true);
  registerDebugShortcut(app, mainWindow);

  mainWindow.loadURL(isDev ? 'http://0.0.0.0:8080/' : `file://${path.join(__dirname, '../build/index.html')}`);

  exports.app = app;
  exports.mainWindow = mainWindow;
};

/* eslint-disable-next-line consistent-return */
app.on('ready', async () => {
  createWindow();
  const [err, proc] = await eres(runDaemon());

  if (err || !proc) return zcashLog(err);

  /* eslint-disable-next-line */
  zcashLog(`ZCash Daemon running. PID: ${proc.pid}`);

  zcashDaemon = proc;
});
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('before-quit', () => {
  if (zcashDaemon) {
    zcashLog('Graceful shutdown ZCash Daemon, this may take a few seconds.');
    zcashDaemon.kill('SIGINT');
  }
});
