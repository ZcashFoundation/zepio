// @flow

import uniqBy from 'lodash.uniqby';
import { FETCH_STATE } from '../../constants/fetch-states';

import type { Action, FetchState } from '../../types/redux';
import type { Transaction } from '../../components/transaction-item';

// Actions
export const LOAD_TRANSACTIONS = 'LOAD_TRANSACTIONS';
export const LOAD_TRANSACTIONS_SUCCESS = 'LOAD_TRANSACTIONS_SUCCESS';
export const LOAD_TRANSACTIONS_ERROR = 'LOAD_TRANSACTIONS_ERROR';
export const RESET_TRANSACTIONS_LIST = 'RESET_TRANSACTIONS_LIST';

export type TransactionsList = { day: string, list: Transaction[] }[];

export const loadTransactions = () => ({
  type: LOAD_TRANSACTIONS,
  payload: {},
});

export const loadTransactionsSuccess = ({
  list,
  zecPrice,
  hasNextPage,
}: {
  list: Transaction[],
  zecPrice: number,
  hasNextPage: boolean,
}) => ({
  type: LOAD_TRANSACTIONS_SUCCESS,
  payload: {
    list,
    zecPrice,
    hasNextPage,
  },
});

export const loadTransactionsError = ({ error }: { error: string }) => ({
  type: LOAD_TRANSACTIONS_ERROR,
  payload: { error },
});

export const resetTransactionsList = () => ({
  type: RESET_TRANSACTIONS_LIST,
  payload: {},
});

export type State = {
  error: string | null,
  list: Transaction[],
  zecPrice: number,
  hasNextPage: boolean,
  fetchState: FetchState,
};

const initialState = {
  zecPrice: 0,
  list: [],
  error: null,
  hasNextPage: true,
  fetchState: FETCH_STATE.INITIALIZING,
};

// eslint-disable-next-line
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_TRANSACTIONS:
      return {
        ...state,
        error: null,
        fetchState: action.fetchState,
      };
    case LOAD_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        list: uniqBy(state.list.concat(action.payload.list), tr => tr.transactionId + tr.type),
        fetchState: FETCH_STATE.SUCCESS,
        error: null,
      };
    case LOAD_TRANSACTIONS_ERROR:
      return {
        ...state,
        fetchState: FETCH_STATE.ERROR,
        error: action.payload.error,
      };
    case RESET_TRANSACTIONS_LIST:
      return {
        ...state,
        isLoading: false,
        isRefreshing: false,
        error: null,
        list: [],
      };
    default:
      return state;
  }
};
