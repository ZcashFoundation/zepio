// @flow

/* eslint-disable import/no-extraneous-dependencies */
import { globalShortcut, typeof BrowserWindow, typeof app as ElectronApp } from 'electron';

export const registerDebugShortcut = (app: ElectronApp, mainWindow: BrowserWindow) => {
  if (globalShortcut) {
    globalShortcut.register('CommandOrControl+Option+B', () => {
      // $FlowFixMe
      app.dock.show();
      // $FlowFixMe
      mainWindow.webContents.openDevTools();
    });
  }
};
