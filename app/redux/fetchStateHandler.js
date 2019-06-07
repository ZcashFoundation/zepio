// @flow
import { LOAD_ADDRESSES } from './modules/receive';
import { LOAD_TRANSACTIONS } from './modules/transactions';
import { LOAD_WALLET_SUMMARY } from './modules/wallet';

import { FETCH_STATE } from '../constants/fetch-states';

import type { Middleware } from '../types/redux';

const calls = new Set();

export const fetchStateHandler: Middleware = () => next => (action) => {
  if (
    action.type === LOAD_ADDRESSES
    || action.type === LOAD_TRANSACTIONS
    || action.type === LOAD_WALLET_SUMMARY
  ) {
    if (calls.has(action.type)) {
      return next({
        ...action,
        fetchState: FETCH_STATE.REFETCHING,
      });
    }

    calls.add(action.type);

    return next({ ...action, fetchState: FETCH_STATE.INITIALIZING });
  }

  return next(action);
};
