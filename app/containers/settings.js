// @flow

import { connect } from 'react-redux';

import { SettingsView } from '../views/settings';

import type { AppState } from '../types/app-state';

const mapStateToProps = ({ walletSummary }: AppState) => ({
  addresses: walletSummary.addresses,
});

// $FlowFixMe
export const SettingsContainer = connect(mapStateToProps)(SettingsView);
