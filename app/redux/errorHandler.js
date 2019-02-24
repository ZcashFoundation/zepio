// @flow
import { LOAD_ADDRESSES_ERROR } from './modules/receive';
import { LOAD_TRANSACTIONS_ERROR } from './modules/transactions';
import { LOAD_WALLET_SUMMARY_ERROR } from './modules/wallet';
import { showErrorModal } from './modules/app';

import type { Middleware } from '../types/redux';

const ERRORS = [LOAD_ADDRESSES_ERROR, LOAD_TRANSACTIONS_ERROR, LOAD_WALLET_SUMMARY_ERROR];

export const errorHandler: Middleware = ({ dispatch }) => next => (action) => {
  // eslint-disable-next-line max-len
  if (ERRORS.includes(action.type)) return dispatch(showErrorModal({ error: action.payload.error || 'Something went wrong!' }));

  return next(action);
};
