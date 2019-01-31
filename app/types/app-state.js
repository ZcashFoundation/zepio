// @flow

import type { State as WalletSummaryState } from '../redux/modules/wallet';
import type { State as TransactionsState } from '../redux/modules/transactions';
import type { State as SendState } from '../redux/modules/send';
import type { State as ReceiveState } from '../redux/modules/receive';
import type { State as App } from '../redux/modules/app';

export type AppState = {
  walletSummary: WalletSummaryState,
  transactions: TransactionsState,
  sendStatus: SendState,
  receive: ReceiveState,
  app: App,
};
