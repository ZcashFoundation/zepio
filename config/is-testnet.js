// @flow
import electronStore from './electron-store';
import { ZCASH_NETWORK, MAINNET } from '../app/constants/zcash-network';

export const isTestnet = () => electronStore.get(ZCASH_NETWORK) !== MAINNET;
