// @flow
import path from 'path';
import fs from 'fs';

import { getZcashFolder } from './get-zcash-folder';

// eslint-disable-next-line
export const readCookieFile = () => new Promise<{ user: string, password: string }>((resolve, reject) => {
  const filePath = path.join(getZcashFolder(), '.cookie');

  fs.readFile(filePath, (err, data) => {
    if (err) return reject(err);

    const cookie = data.toString();

    const [user, password] = cookie.split(':');

    resolve({
      user,
      password,
    });
  });
});
