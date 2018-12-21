// @flow
import type { Action } from '../../types/redux';

export const SEND_TRANSACTION = 'SEND_TRANSACTION';
export const SEND_TRANSACTION_SUCCESS = 'SEND_TRANSACTION_SUCCESS';
export const SEND_TRANSACTION_ERROR = 'SEND_TRANSACTION_ERROR';

export const sendTransaction = () => ({
  type: SEND_TRANSACTION,
  payload: {},
});

export const sendTransactionSuccess = () => ({
  type: SEND_TRANSACTION_SUCCESS,
  payload: {},
});

export const sendTransactionError = ({ error }: { error: string }) => ({
  type: SEND_TRANSACTION_ERROR,
  payload: {
    error,
  },
});

export type State = {
  isSending: boolean,
  error: string | null,
};

const initialState = {
  isSending: false,
  error: null,
};

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case SEND_TRANSACTION:
      return { isSending: true, error: null };
    case SEND_TRANSACTION_SUCCESS:
      return { isSending: false, error: null };
    case SEND_TRANSACTION_ERROR:
      return { isSending: false, error: action.payload.error };
    default:
      return state;
  }
};
