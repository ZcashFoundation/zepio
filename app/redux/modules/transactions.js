// @flow
import uniqBy from 'lodash.uniqby';
import type { Action } from '../../types/redux';
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
  isLoading: boolean,
  error: string | null,
  list: Transaction[],
  zecPrice: number,
  hasNextPage: boolean,
};

const initialState = {
  zecPrice: 0,
  list: [],
  error: null,
  isLoading: false,
  hasNextPage: true,
};

// eslint-disable-next-line
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_TRANSACTIONS:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case LOAD_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        list: uniqBy(state.list.concat(action.payload.list), tr => tr.transactionId + tr.type),
        isLoading: false,
        error: null,
      };
    case LOAD_TRANSACTIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case RESET_TRANSACTIONS_LIST:
      return {
        ...state,
        isLoading: false,
        error: null,
        list: [],
      };
    default:
      return state;
  }
};
