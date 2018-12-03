// @flow
import fs from 'fs';
import path from 'path';
import cp from 'child_process';

import got from 'got';

// eslint-disable-next-line
import { app } from '../electron';
import getBinariesPath from './get-binaries-path';
import log from './logger';

const httpClient = got.extend({ baseUrl: 'https://z.cash/downloads/', retry: 3, useElectronNet: true });

const FILES = [
  'sprout-proving.key',
  'sprout-verifying.key',
  'sapling-spend.params',
  'sapling-output.params',
  'sprout-groth16.params',
];

export default (): Promise<*> => new Promise((resolve, reject) => {
  const firstRunProcess = cp.spawn(path.join(getBinariesPath(), 'win', 'first-run.bat'));
  firstRunProcess.stdout.on('data', data => log(data.toString()));
  firstRunProcess.stderr.on('data', data => reject(data.toString()));
  firstRunProcess.on('exit', (code, err) => {
    if (code !== 0 || err) {
      reject(new Error(err));
    }

    FILES.forEach((filename) => {
      // TODO: Log download progress

      log(`Downloading ${filename}...`);

      httpClient
        .stream(filename)
        .on('end', () => log(`Download ${filename} finished!`))
        .pipe(fs.createWriteStream(`${path.join(app.getPath('userData'), '..', 'ZcashParams', filename)}`));
    });
  });
});
