// @flow
import type { Action } from '../../types/redux';

export const SEND_TRANSACTION = 'SEND_TRANSACTION';
export const SEND_TRANSACTION_SUCCESS = 'SEND_TRANSACTION_SUCCESS';
export const SEND_TRANSACTION_ERROR = 'SEND_TRANSACTION_ERROR';
export const RESET_SEND_TRANSACTION = 'RESET_SEND_TRANSACTION';

export const sendTransaction = () => ({
  type: SEND_TRANSACTION,
  payload: {},
});

export const sendTransactionSuccess = ({
  operationId,
}: {
  operationId: string,
}) => ({
  type: SEND_TRANSACTION_SUCCESS,
  payload: {
    operationId,
  },
});

export const sendTransactionError = ({ error }: { error: string }) => ({
  type: SEND_TRANSACTION_ERROR,
  payload: {
    error,
  },
});

export const resetSendTransaction = () => ({
  type: RESET_SEND_TRANSACTION,
  payload: {},
});

export type State = {
  isSending: boolean,
  error: string | null,
  operationId: string | null,
};

const initialState = {
  isSending: false,
  error: null,
  operationId: null,
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SEND_TRANSACTION:
      return { isSending: true, error: null, operationId: null };
    case SEND_TRANSACTION_SUCCESS:
      return {
        isSending: false,
        error: null,
        operationId: action.payload.operationId,
      };
    case SEND_TRANSACTION_ERROR:
      return {
        isSending: false,
        error: action.payload.error,
        operationId: null,
      };
    case RESET_SEND_TRANSACTION:
      return initialState;
    default:
      return state;
  }
};
