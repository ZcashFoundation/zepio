// @flow

import os from 'os';

export default () => {
  if (os.platform() === 'win32') {
    return 'zcashd.exe';
  }

  return 'zcashd';
};
