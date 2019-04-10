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

(async () => {
  const [, releasesResponse] = await eres(
    octokit.repos.listReleases({
      owner: OWNER,
      repo: PROJECT,
    }),
  );

  const releases = releasesResponse?.data;

  if (!releases) {
    console.log("Error: Can't get releases");
    return;
  }

  const releaseWithSameTag = releases.find(cur => cur.tag_name === VERSION);

  if (releaseWithSameTag) {
    console.log('Warning: Already exists a release with that same tag, skipping');
    return;
  }

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
    console.log('Error: ', createReleaseError);
    return;
  }

  const files = await fs.readdirSync(DIST_FOLDER);

  const binaries = files
    // .filter(name => name.endsWith('.exe') || name.endsWith('.deb') || name.endsWith('.pkg'))
    .map(bin => ({ path: `${DIST_FOLDER}/${bin}`, name: bin }));

  const [, signaturesPath] = await eres(signBinaries(binaries.map(bin => bin.path)));

  if (!signaturesPath) {
    console.log("Error: Can't sign files, please verify the output");
    return;
  }

  const filesToUpload = [...binaries, { path: signaturesPath, name: 'signatures.zip' }];

  filesToUpload.forEach(async ({ path: fPath, name }) => {
    const file = fs.readFileSync(fPath);

    await octokit.repos.uploadReleaseAsset({
      headers: {
        'content-length': file.length,
        'content-type': mime.lookup(fPath),
      },
      url: createReleaseResponse.data.upload_url,
      name,
      file: fs.createReadStream(fPath),
    });
  });
})();
