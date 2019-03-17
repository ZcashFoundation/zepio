// @flow
import eres from 'eres';
import { connect } from 'react-redux';
import electron from 'electron'; // eslint-disable-line

import electronStore from '../../config/electron-store';
import { ZCASH_NETWORK } from '../constants/zcash-network';
import { SettingsView } from '../views/settings';

import { loadAddressesSuccess, loadAddressesError } from '../redux/modules/receive';

import rpc from '../../services/api';

import type { AppState } from '../types/app-state';
import type { Dispatch } from '../types/redux';

export type MapStateToProps = {|
  addresses: { address: string, balance: number }[],
  zcashNetwork: string,
  embeddedDaemon: boolean,
|};

const mapStateToProps = ({ receive, app }: AppState): MapStateToProps => ({
  addresses: receive.addresses,
  zcashNetwork: app.zcashNetwork,
  embeddedDaemon: app.embeddedDaemon,
});

export type MapDispatchToProps = {|
  loadAddresses: () => Promise<void>,
  updateZcashNetwork: (newNetwork: string) => void,
|};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  loadAddresses: async () => {
    const [zAddressesErr, zAddresses] = await eres(rpc.z_listaddresses());

    const [tAddressesErr, transparentAddresses] = await eres(rpc.getaddressesbyaccount(''));

    if (zAddressesErr || tAddressesErr) return dispatch(loadAddressesError({ error: 'Something went wrong!' }));

    dispatch(
      loadAddressesSuccess({
        addresses: [...zAddresses, ...transparentAddresses].map(add => ({
          address: add,
          balance: 0,
        })),
      }),
    );
  },
  updateZcashNetwork: (newNetwork) => {
    electronStore.set(ZCASH_NETWORK, newNetwork);

    electron.remote.app.relaunch();
    electron.remote.app.quit();
  },
});

// $FlowFixMe
export const SettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsView);
