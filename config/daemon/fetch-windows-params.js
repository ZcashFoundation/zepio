// @flow

/* eslint-disable consistent-return */

import fs from 'fs';
import path from 'path';
import cp from 'child_process';
import crypto from 'crypto';
import util from 'util';

import eres from 'eres';
import got from 'got';
import Queue from 'p-queue';

// eslint-disable-next-line
import { app } from '../electron';
import getBinariesPath from './get-binaries-path';
import log from './logger';

const queue = new Queue({ concurrency: 1, autoStart: false });

const httpClient = got.extend({ baseUrl: 'https://z.cash/downloads/', retry: 3, useElectronNet: true });

const FILES: Array<{ name: string, hash: string }> = [
  { name: 'sprout-proving.key', hash: '8bc20a7f013b2b58970cddd2e7ea028975c88ae7ceb9259a5344a16bc2c0eef7' },
  { name: 'sprout-verifying.key', hash: '4bd498dae0aacfd8e98dc306338d017d9c08dd0918ead18172bd0aec2fc5df82' },
  { name: 'sapling-spend.params', hash: '8e48ffd23abb3a5fd9c5589204f32d9c31285a04b78096ba40a79b75677efc13' },
  { name: 'sapling-output.params', hash: '2f0ebbcbb9bb0bcffe95a397e7eba89c29eb4dde6191c339db88570e3f3fb0e4' },
  { name: 'sprout-groth16.params', hash: 'b685d700c60328498fbde589c8c7c484c722b788b265b72af448a5bf0ee55b50' },
];

const checkSha256 = (pathToFile: string, expectedHash: string) => new Promise((resolve, reject) => {
  fs.readFile(pathToFile, (err, file) => {
    if (err) return reject(new Error(err));

    const sum = crypto.createHash('sha256');
    sum.update(file);
    resolve(sum.digest('hex') === expectedHash);
  });
});

const downloadFile = ({ file, pathToSave }): Promise<*> => new Promise((resolve, reject) => {
  log(`Downloading ${file.name}...`);

  httpClient
    .stream(file.name)
    .on('end', () => {
      checkSha256(pathToSave, file.hash).then((isValid) => {
        if (isValid) {
          log(`SHA256 validation for file ${file.name} succeeded!`);
          resolve(file.name);
        } else {
          reject(new Error(`SHA256 validation failed for file: ${file.name}`));
        }
      });
    })
    .on('error', err => reject(new Error(err)))
    .pipe(fs.createWriteStream(pathToSave));
});

let missingDownloadParam = false;

export default (): Promise<*> => new Promise((resolve, reject) => {
  const firstRunProcess = cp.spawn(path.join(getBinariesPath(), 'win', 'first-run.bat'));
  firstRunProcess.stdout.on('data', data => log(data.toString()));
  firstRunProcess.stderr.on('data', data => reject(data.toString()));

  firstRunProcess.on('exit', async (code, err) => {
    if (code !== 0 || err) return reject(new Error(err));

    await Promise.all(
      FILES.map(async (file) => {
        // TODO: Log download progress
        const pathToSave = path.join(app.getPath('userData'), '..', 'ZcashParams', file.name);

        const [cannotAccess] = await eres(util.promisify(fs.access)(pathToSave, fs.constants.F_OK));

        if (cannotAccess) {
          missingDownloadParam = true;
          queue.add(() => downloadFile({ file, pathToSave }).then(() => {
            log(`Download ${file.name} finished!`);
          }));
        } else {
          // TODO: Check file sha256
          log(`${file.name} already is in ${pathToSave}...`);
        }
      }),
    );

    if (!missingDownloadParam) return resolve();

    queue.onEmpty(resolve);
    queue.start();
  });
});
