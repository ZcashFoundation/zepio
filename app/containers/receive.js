// @flow

import eres from 'eres';
import { connect } from 'react-redux';
import { BigNumber } from 'bignumber.js';

import { ReceiveView } from '../views/receive';
import { SAPLING } from '../constants/zcash-network';

import {
  loadAddresses,
  loadAddressesSuccess,
  loadAddressesError,
  getNewAddressSuccess,
  getNewAddressError,
  type addressType,
} from '../redux/modules/receive';

import { asyncMap } from '../utils/async-map';
import { getLatestAddressKey } from '../utils/get-latest-address-key';

import rpc from '../../services/api';
import electronStore from '../../config/electron-store';

import type { AppState } from '../types/app-state';
import type { Dispatch } from '../types/redux';

export type MapStateToProps = {|
  isLoading: boolean,
  isFirstLoad: boolean,
  addresses: { address: string, balance: number }[],
|};

const mapStateToProps = ({ receive }: AppState): MapStateToProps => ({
  addresses: receive.addresses,
  isLoading: receive.isLoading,
  isFirstLoad: receive.isFirstLoad,
});

export type MapDispatchToProps = {|
  loadAddresses: () => Promise<*>,
  getNewAddress: ({ type: addressType }) => Promise<*>,
|};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  loadAddresses: async () => {
    dispatch(loadAddresses());

    const [zAddressesErr, zAddresses] = await eres(rpc.z_listaddresses());

    const [tAddressesErr, transparentAddresses] = await eres(rpc.getaddressesbyaccount(''));

    if (zAddressesErr || tAddressesErr) return dispatch(loadAddressesError({ error: 'Something went wrong!' }));

    const latestZAddress = zAddresses.find(addr => addr === electronStore.get(getLatestAddressKey('shielded')))
      || zAddresses[0];

    const latestTAddress = transparentAddresses.find(
      addr => addr === electronStore.get(getLatestAddressKey('transparent')),
    ) || transparentAddresses[0];

    const allAddresses = await asyncMap(
      [
        ...zAddresses.filter(cur => cur !== latestZAddress),
        ...transparentAddresses.filter(cur => cur !== latestTAddress),
      ],
      async (address) => {
        const [err, response] = await eres(rpc.z_getbalance(address));

        if (!err && new BigNumber(response).isGreaterThan(0)) return { address, balance: response };

        return null;
      },
    );

    dispatch(
      loadAddressesSuccess({
        addresses: [
          latestZAddress
            ? {
              address: latestZAddress,
              balance: await rpc.z_getbalance(latestZAddress),
            }
            : null,
          latestTAddress
            ? { address: latestTAddress, balance: await rpc.z_getbalance(latestTAddress) }
            : null,
          ...allAddresses,
        ].filter(Boolean),
      }),
    );
  },
  getNewAddress: async ({ type }) => {
    const [error, address] = await eres(
      type === 'shielded' ? rpc.z_getnewaddress(SAPLING) : rpc.getnewaddress(''),
    );

    if (error || !address) return dispatch(getNewAddressError({ error: 'Unable to generate a new address' }));

    // the list addresses rpc method does not guarantee the order of creation of the addresses
    // so we need to save the last address created in the store
    electronStore.set(getLatestAddressKey(type), address);

    dispatch(getNewAddressSuccess({ address }));
  },
});

// $FlowFixMe
export const ReceiveContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReceiveView);
