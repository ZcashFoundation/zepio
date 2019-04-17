// @flow

/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-destructuring */

import '@babel/polyfill';
import fs from 'fs';
import path from 'path';
import cp from 'child_process';
import Octokit from '@octokit/rest';
import eres from 'eres';
import mime from 'mime-types';
import packageJson from '../package';

const DIST_FOLDER = path.join(__dirname, '..', './dist');
const VERSION = packageJson.version;
const GH_TOKEN = process.env.GH_TOKEN;
const OWNER = 'andrerfneves';
const PROJECT = 'zepio';

const octokit = new Octokit({ auth: GH_TOKEN });

const signBinaries = binaries => new Promise((resolve, reject) => {
  const signProcess = cp.spawn(`${__dirname}/codesign.sh`, binaries);
  signProcess.stdout.on('data', out => console.log('[Code Sign]', out.toString()));
  signProcess.on('exit', (code) => {
    if (code === 0) {
      resolve(path.join(__dirname, '..', 'signatures.zip'));
    } else {
      reject();
    }
  });
});

const getFileName = (name) => {
  const extension = name.substr(name.length - 3);

  switch (extension) {
    case 'dmg':
      return `Zepio-macOS-v${VERSION}.dmg`;
    case 'deb':
      return `zepio-linux-v${VERSION}.deb`;
    case 'exe':
      return `Zepio-Windows-v${VERSION}.exe`;
    case 'zip':
      return `signatures-v${VERSION}.zip`;
    default:
      return 'Zepio';
  }
};

(async () => {
  console.log(`Creating release v${VERSION}`);

  const [createReleaseError, createReleaseResponse] = await eres(
    octokit.repos.createRelease({
      owner: OWNER,
      repo: PROJECT,
      tag_name: `v${VERSION}`,
      name: `v${VERSION}`,
    }),
  );

  if (createReleaseError) {
    console.log(createReleaseError);
    return;
  }

  const files = await fs.readdirSync(DIST_FOLDER);

  const binaries = files
    .filter(name => name.endsWith('.exe') || name.endsWith('.deb') || name.endsWith('dmg'))
    .map(bin => ({ path: `${DIST_FOLDER}/${bin}`, name: bin }));

  const [, signaturesPath] = await eres(signBinaries(binaries.map(bin => bin.path)));

  if (!signaturesPath) {
    throw new Error("Error: Can't sign files, please verify the output");
  }

  const filesToUpload = [...binaries, { path: signaturesPath, name: 'signatures.zip' }];

  await Promise.all(
    filesToUpload.map(async ({ path: fPath, name }) => {
      const file = fs.readFileSync(fPath);

      await octokit.repos.uploadReleaseAsset({
        headers: {
          'content-length': file.length,
          'content-type': mime.lookup(fPath),
        },
        url: createReleaseResponse.data.upload_url,
        name: getFileName(name),
        file: fs.createReadStream(fPath),
      });
    }),
  );
})();
