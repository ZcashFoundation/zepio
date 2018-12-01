// @flow
import os from 'os';

export default () => {
  const platform = os.platform();

  if (platform === 'darwin') {
    return 'mac';
  }

  return 'linux';
};
