// @flow
import os from 'os';

export default () => {
  if (os.platform() === 'darwin') {
    return 'mac';
  }

  if (os.platform() === 'win32') {
    return 'win';
  }

  return 'linux';
};
