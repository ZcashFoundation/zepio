// @flow
import eres from 'eres';
import { connect } from 'react-redux';

import { SettingsView } from '../views/settings';

import { loadAddressesSuccess, loadAddressesError } from '../redux/modules/receive';

import rpc from '../../services/api';

import type { AppState } from '../types/app-state';
import type { Dispatch } from '../types/redux';

export type MapStateToProps = {|
  addresses: string[],
|};

const mapStateToProps = ({ receive }: AppState): MapStateToProps => ({
  addresses: receive.addresses,
});

export type MapDispatchToProps = {|
  loadAddresses: () => Promise<void>,
|};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
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
});

// $FlowFixMe
export const SettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsView);
