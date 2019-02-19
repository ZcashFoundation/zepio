// @flow

/* eslint-disable import/no-extraneous-dependencies */
import { globalShortcut, typeof BrowserWindow, typeof app as ElectronApp } from 'electron';

export const registerDebugShortcut = (app: ElectronApp, mainWindow: BrowserWindow) => globalShortcut.register('CommandOrControl+Option+B', () => {
  mainWindow.webContents.openDevTools();
});
