// @flow
import eres from 'eres';
import { connect } from 'react-redux';

import { ReceiveView } from '../views/receive';

import {
  loadAddressesSuccess,
  loadAddressesError,
  getNewAddressSuccess,
  getNewAddressError,
  type addressType,
} from '../redux/modules/receive';

import rpc from '../../services/api';

import type { AppState } from '../types/app-state';
import type { Dispatch } from '../types/redux';

const mapStateToProps = ({ receive }: AppState) => ({
  addresses: receive.addresses,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadAddresses: async () => {
    const [zAddressesErr, zAddresses] = await eres(rpc.z_listaddresses());

    const [tAddressesErr, transparentAddresses] = await eres(rpc.getaddressesbyaccount(''));

    if (zAddressesErr || tAddressesErr) return dispatch(loadAddressesError({ error: 'Something went wrong!' }));

    dispatch(
      loadAddressesSuccess({
        addresses: [...zAddresses, ...transparentAddresses],
      }),
    );
  },
  getNewAddress: async ({ type }: { type: addressType }) => {
    const [error, address] = await eres(
      type === 'shielded' ? rpc.z_getnewaddress() : rpc.getnewaddress(''),
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
