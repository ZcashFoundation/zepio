// @flow
import os from 'os';

import log from './logger';
import fetchWindowsParams from './fetch-windows-params';
import runUnixFetchParams from './fetch-unix-params';

export default (): Promise<*> => {
  log('Fetching params');

  if (os.platform() === 'win32') {
    return fetchWindowsParams();
  }

  return runUnixFetchParams();
};
