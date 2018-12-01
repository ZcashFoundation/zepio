// @flow
import os from 'os';

export default () => {
  if (os.platform() === 'darwin') {
    return 'mac';
  }

  return 'linux';
};
