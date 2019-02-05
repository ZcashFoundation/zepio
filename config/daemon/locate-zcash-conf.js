// @flow
import path from 'path';
import os from 'os';

import { app } from '../electron'; // eslint-disable-line

export const locateZcashConf = () => {
  if (os.platform() === 'darwin') {
    return path.join(app.getPath('appData'), 'Zcash', 'zcash.conf');
  }

  if (os.platform() === 'linux') {
    return path.join(app.getPath('home'), '.zcash', 'zcash.conf');
  }

  return path.join(app.getPath('appData'), 'Zcash', 'zcash.conf');
};
