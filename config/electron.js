// @flow
import path from 'path';

/* eslint-disable import/no-extraneous-dependencies */
import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import isDev from 'electron-is-dev';
/* eslint-enable import/no-extraneous-dependencies */
import type { BrowserWindow as BrowserWindowType } from 'electron';
import { registerDebugShortcut } from '../utils/debug-shortcut';

let mainWindow: BrowserWindowType;
let updateAvailable: boolean = false;

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

  mainWindow.setVisibleOnAllWorkspaces(true);
  registerDebugShortcut(app, mainWindow);

  mainWindow.loadURL(isDev
    ? 'http://0.0.0.0:8080/'
    : `file://${path.join(__dirname, '../build/index.html')}`);

  exports.app = app;
};

app.on('ready', createWindow);
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
