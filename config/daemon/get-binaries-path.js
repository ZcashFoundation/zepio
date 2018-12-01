// @flow
import path from 'path';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import isDev from 'electron-is-dev';

// $FlowFixMe
export default () => (isDev ? path.join(__dirname, '..', '..', './bin') : path.join(process.resourcesPath, 'bin'));
