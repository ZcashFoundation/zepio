// @flow
import { connect } from 'react-redux';

import { ReceiveView } from '../views/receive';

import type { AppState } from '../types/app-state';

const mapStateToProps = ({ walletSummary }: AppState) => ({
  addresses: walletSummary.addresses,
});

export const ReceiveContainer = connect(mapStateToProps)(ReceiveView);
