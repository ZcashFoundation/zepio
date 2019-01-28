// @flow
// eslint-disable-next-line
import electron from 'electron';

export default (url: string) => electron.shell.openExternal(url);
