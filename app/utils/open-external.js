// @flow

// eslint-disable-next-line
import electron from 'electron';

export const openExternal = (url: string) => electron.shell.openExternal(url);
