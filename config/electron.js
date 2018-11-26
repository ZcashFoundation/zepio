// @flow
import path from 'path';

/* eslint-disable import/no-extraneous-dependencies */
import {
  app, BrowserWindow, powerMonitor, Tray,
} from 'electron';
import { autoUpdater } from 'electron-updater';
import Positioner from 'electron-positioner';
import isDev from 'electron-is-dev';
/* eslint-enable import/no-extraneous-dependencies */

import type { BrowserWindow as BrowserWindowType, Tray as TrayType } from 'electron';

import { registerDebugShortcut } from '../utils/debugShortcut';

let mainWindow: BrowserWindowType;
let tray: TrayType;
let updateAvailable = false;

const showStatus = (text) => {
  if (text === 'Update downloaded') updateAvailable = true;

  mainWindow.webContents.send('update', {
    updateAvailable,
    updateInfo: text,
  });
};

function createWindow() {
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
    transparent: true,
    frame: false,
    resizable: true,
    webPreferences: {
      devTools: true,
      webSecurity: false,
    },
  });

  mainWindow.setVisibleOnAllWorkspaces(true);

  // TODO: Update to right icon location
  tray = new Tray(path.join(__dirname, '../public/images', 'zcash-icon.png'));

  registerDebugShortcut(app, mainWindow);

  tray.setToolTip('ZCash');
  mainWindow.loadURL(isDev ? 'http://0.0.0.0:8080/' : `file://${path.join(__dirname, '../dist/index.html')}`);

  const positioner = new Positioner(mainWindow);
  let bounds = tray.getBounds();
  positioner.move('trayCenter', bounds);

  powerMonitor.on('suspend', () => mainWindow.webContents.send('suspend', 'suspended'));
  powerMonitor.on('resume', () => mainWindow.webContents.send('resume', 'resumed'));

  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('blur', () => mainWindow.hide());
  mainWindow.on('show', () => tray.setHighlightMode('always'));
  mainWindow.on('hide', () => tray.setHighlightMode('never'));
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  tray.on('click', () => {
    bounds = tray.getBounds();
    positioner.move('trayCenter', bounds);

    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });

  exports.app = app;
  exports.tray = tray;
}

app.on('ready', createWindow);
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
