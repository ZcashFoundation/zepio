// @flow
import type { Action } from '../../types/redux';
import type { Transaction } from '../../components/transaction-item';

// Actions
export const LOAD_TRANSACTIONS = 'LOAD_TRANSACTIONS';
export const LOAD_TRANSACTIONS_SUCCESS = 'LOAD_TRANSACTIONS_SUCCESS';
export const LOAD_TRANSACTIONS_ERROR = 'LOAD_TRANSACTIONS_ERROR';

export const loadTransactions = () => ({
  type: LOAD_TRANSACTIONS,
  payload: {},
});

export const loadTransactionsSuccess = ({
  list,
  zecPrice,
}: {
  list: { [day: string]: Transaction[] },
  zecPrice: number,
}) => ({
  type: LOAD_TRANSACTIONS_SUCCESS,
  payload: {
    list,
    zecPrice,
  },
});

export const loadTransactionsError = ({ error }: { error: string }) => ({
  type: LOAD_TRANSACTIONS_ERROR,
  payload: { error },
});

export type State = {
  isLoading: boolean,
  error: string | null,
  list: { [day: string]: Transaction[] },
  zecPrice: number,
};

const initialState = {
  zecPrice: 0,
  list: {},
  error: null,
  isLoading: false,
};

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
        isLoading: false,
        error: null,
      };
    case LOAD_TRANSACTIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
