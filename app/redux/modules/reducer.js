// @flow

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { RouterHistory } from 'react-router-dom';

import wallet from './wallet';
import transactions from './transactions';
import send from './send';

// $FlowFixMe
export const createRootReducer = (history: RouterHistory) => combineReducers({
  walletSummary: wallet,
  transactions,
  sendStatus: send,
  router: connectRouter(history),
});
