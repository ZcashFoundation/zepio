// @flow
import electron from 'electron'; // eslint-disable-line
import { isTestnet } from '../../config/is-testnet';

export const getCoinName = () => {
  if (electron.remote.process.env.NODE_ENV === 'test' || isTestnet()) return 'TAZ';

  return 'ZEC';
};
