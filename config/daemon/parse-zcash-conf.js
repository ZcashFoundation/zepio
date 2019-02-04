// @flow
import fs from 'fs';

import { locateZcashConf } from './locate-zcash-conf';
import { filterObjectNullKeys } from '../../app/utils/filter-object-null-keys';

export const parseZcashConf = (): Promise<Array<string>> => new Promise((resolve, reject) => {
  fs.readFile(locateZcashConf(), (err, file) => {
    // TODO: Maybe we can create the zcash.conf on the fly here
    if (err) return reject(err);

    const fileString = file.toString();

    const optionsFromZcashConf = filterObjectNullKeys(
      fileString.split('\n').reduce((acc, cur) => {
        const [key, value] = cur.split('=');
        return { ...acc, [key]: value };
      }, {}),
    );

    resolve(
      Object.keys(optionsFromZcashConf).reduce(
        (acc, key) => acc.concat(`-${key}=${optionsFromZcashConf[key]}`),
        [],
      ),
    );
  });
});
