// @flow
import type { Action } from '../../types/redux';
import type { Transaction } from '../../components/transaction-item';

// Actions
export const LOAD_WALLET_SUMMARY = 'LOAD_WALLET_SUMMARY';
export const LOAD_WALLET_SUMMARY_SUCCESS = 'LOAD_WALLET_SUMMARY_SUCCESS';
export const LOAD_WALLET_SUMMARY_ERROR = 'LOAD_WALLET_SUMMARY_ERROR';

// Actions Creators
export const loadWalletSummary = () => ({
  type: LOAD_WALLET_SUMMARY,
  payload: {},
});

export const loadWalletSummarySuccess = ({
  total,
  shielded,
  transparent,
  addresses,
  transactions,
  zecPrice,
}: {
  total: number,
  shielded: number,
  transparent: number,
  addresses: string[],
  transactions: { [day: string]: Transaction[] },
  zecPrice: number,
}) => ({
  type: LOAD_WALLET_SUMMARY_SUCCESS,
  payload: {
    total,
    shielded,
    transparent,
    addresses,
    transactions,
    zecPrice,
  },
});

export const loadWalletSummaryError = ({ error }: { error: string }) => ({
  type: LOAD_WALLET_SUMMARY_ERROR,
  payload: { error },
});

export type State = {
  total: number,
  shielded: number,
  transparent: number,
  error: string | null,
  isLoading: boolean,
  zecPrice: number,
  addresses: [],
  transactions: { [day: string]: Transaction[] },
};

const initialState = {
  total: 0,
  shielded: 0,
  transparent: 0,
  error: null,
  isLoading: false,
  zecPrice: 0,
  addresses: [],
  transactions: {},
};

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_WALLET_SUMMARY:
      return { ...state, isLoading: true };
    case LOAD_WALLET_SUMMARY_SUCCESS:
      // TODO: Get zec in dollars
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        error: null,
      };
    case LOAD_WALLET_SUMMARY_ERROR:
      return { ...state, isLoading: false, error: action.payload.error };
    default:
      return state;
  }
};
