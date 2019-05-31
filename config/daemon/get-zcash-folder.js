// @flow
import os from 'os';
import path from 'path';
import electron from 'electron'; // eslint-disable-line

export const getZcashFolder = () => {
  const { app } = electron;

  if (os.platform() === 'darwin') {
    return path.join(app.getPath('appData'), 'Zcash');
  }

  if (os.platform() === 'linux') {
    return path.join(app.getPath('home'), '.zcash');
  }

  return path.join(app.getPath('appData'), 'Zcash');
};
