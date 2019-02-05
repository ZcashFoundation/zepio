// @flow

import path from 'path';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import isDev from 'electron-is-dev';

// eslint-disable-next-line
export default () => (isDev
  ? path.join(__dirname, '..', '..', './bin')
  // eslint-disable-next-line
  : // $FlowFixMe
  path.join(process.resourcesPath, 'bin'));
