// @flow

import os from 'os';

import { log } from './logger';
import fetchWindowsParams from './fetch-windows-params';
import runUnixFetchParams from './fetch-unix-params';

// eslint-disable-next-line
export default (): Promise<*> => {
  log('Fetching params');

  return os.platform() === 'win32' ? fetchWindowsParams() : runUnixFetchParams();
};
