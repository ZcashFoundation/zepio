// @flow

import isDev from 'electron-is-dev';

export const ZCASH_EXPLORER_BASE_URL = isDev
  ? 'https://chain.so/tx/ZECTEST/'
  : 'https://zcash.blockexplorer.com/tx/';
