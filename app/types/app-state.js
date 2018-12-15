// @flow

import type { State as WalletSummaryState } from '../redux/modules/wallet';
import type { State as TransactionsState } from '../redux/modules/transactions';

export type AppState = {
  walletSummary: WalletSummaryState,
  transactions: TransactionsState,
};
