// @flow

import type { State as WalletSummaryState } from '../redux/modules/wallet';
import type { State as TransactionsState } from '../redux/modules/transactions';
import type { State as SendState } from '../redux/modules/send';

export type AppState = {
  walletSummary: WalletSummaryState,
  transactions: TransactionsState,
  sendStatus: SendState,
};
