// @flow

import eres from 'eres';
import { connect } from 'react-redux';
import { BigNumber } from 'bignumber.js';

import { ReceiveView } from '../views/receive';
import { SAPLING } from '../constants/zcash-network';

import {
  loadAddressesSuccess,
  loadAddressesError,
  getNewAddressSuccess,
  getNewAddressError,
  type addressType,
} from '../redux/modules/receive';

import { asyncMap } from '../utils/async-map';

import rpc from '../../services/api';

import type { AppState } from '../types/app-state';
import type { Dispatch } from '../types/redux';

export type MapStateToProps = {|
  addresses: { address: string, balance: number }[],
|};

const mapStateToProps = ({ receive }: AppState): MapStateToProps => ({
  addresses: receive.addresses,
});

export type MapDispatchToProps = {|
  loadAddresses: () => Promise<*>,
  getNewAddress: ({ type: addressType }) => Promise<*>,
|};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  loadAddresses: async () => {
    const [zAddressesErr, zAddresses] = await eres(rpc.z_listaddresses());

    const [tAddressesErr, transparentAddresses] = await eres(rpc.getaddressesbyaccount(''));

    if (zAddressesErr || tAddressesErr) return dispatch(loadAddressesError({ error: 'Something went wrong!' }));

    const latestZAddress = zAddresses[0]
      ? {
        address: zAddresses[0],
        balance: await rpc.z_getbalance(zAddresses[0]),
      }
      : null;
    const latestTAddress = transparentAddresses[0]
      ? {
        address: transparentAddresses[0],
        balance: await rpc.z_getbalance(transparentAddresses[0]),
      }
      : null;

    const allAddresses = await asyncMap(
      [...zAddresses.slice(1), ...transparentAddresses.slice(1)],
      async (address) => {
        const [err, response] = await eres(rpc.z_getbalance(address));

        if (!err && new BigNumber(response).isGreaterThan(0)) return { address, balance: response };

        return null;
      },
    );

    dispatch(
      loadAddressesSuccess({
        addresses: [latestZAddress, latestTAddress, ...allAddresses].filter(Boolean),
      }),
    );
  },
  getNewAddress: async ({ type }) => {
    const [error, address] = await eres(
      type === 'shielded' ? rpc.z_getnewaddress(SAPLING) : rpc.getnewaddress(''),
    );

    if (error || !address) return dispatch(getNewAddressError({ error: 'Unable to generate a new address' }));

    dispatch(getNewAddressSuccess({ address }));
  },
});

// $FlowFixMe
export const ReceiveContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReceiveView);
