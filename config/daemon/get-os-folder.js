// @flow

import os from 'os';

// eslint-disable-next-line
export default () => {
  if (os.platform() === 'darwin') {
    return 'mac';
  }

  if (os.platform() === 'win32') {
    return 'win';
  }

  return 'linux';
};
