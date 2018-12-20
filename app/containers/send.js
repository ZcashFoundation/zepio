// @flow
import { connect } from 'react-redux';

import { SendView } from '../views/send';

import type { AppState } from '../types/app-state';

const mapStateToProps = ({ walletSummary }: AppState) => ({
  balance: walletSummary.total,
  zecPrice: walletSummary.zecPrice,
  addresses: walletSummary.addresses,
});

export const SendContainer = connect(mapStateToProps)(SendView);
