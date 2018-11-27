// @flow

/* eslint-disable import/no-extraneous-dependencies */
import { globalShortcut } from 'electron';

export const registerDebugShortcut = (app: Object, mainWindow: Object) => globalShortcut.register('CommandOrControl+Option+B', () => {
  app.dock.show();
  mainWindow.webContents.openDevTools();
});
