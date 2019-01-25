// @flow
import path from 'path';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import isDev from 'electron-is-dev';

/* eslint-disable operator-linebreak */
export default () => (isDev
  ? path.join(__dirname, '..', '..', './bin')
  : // $FlowFixMe
  path.join(process.resourcesPath, 'bin'));
