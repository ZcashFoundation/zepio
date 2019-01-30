// @flow
import type { Action } from '../../types/redux';

export const SEND_TRANSACTION = 'SEND_TRANSACTION';
export const SEND_TRANSACTION_SUCCESS = 'SEND_TRANSACTION_SUCCESS';
export const SEND_TRANSACTION_ERROR = 'SEND_TRANSACTION_ERROR';
export const RESET_SEND_TRANSACTION = 'RESET_SEND_TRANSACTION';
export const VALIDATE_ADDRESS_SUCCESS = 'VALIDATE_ADDRESS_SUCCESS';
export const VALIDATE_ADDRESS_ERROR = 'VALIDATE_ADDRESS_SUCCESS';
export const LOAD_ZEC_PRICE = 'LOAD_ZEC_PRICE';

export const sendTransaction = () => ({
  type: SEND_TRANSACTION,
  payload: {},
});

export const sendTransactionSuccess = ({ operationId }: { operationId: string }) => ({
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

export const validateAddressSuccess = ({ isValid }: { isValid: boolean }) => ({
  type: VALIDATE_ADDRESS_SUCCESS,
  payload: {
    isValid,
  },
});

export const validateAddressError = () => ({
  type: VALIDATE_ADDRESS_ERROR,
  payload: {},
});

export const loadZECPrice = ({ value }: { value: number }) => ({
  type: LOAD_ZEC_PRICE,
  payload: {
    value,
  },
});

export type State = {
  isSending: boolean,
  isToAddressValid: boolean,
  error: string | null,
  operationId: string | null,
  zecPrice: number,
};

const initialState: State = {
  isSending: false,
  error: null,
  operationId: null,
  isToAddressValid: false,
  zecPrice: 0,
};
// eslint-disable-next-line
export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SEND_TRANSACTION:
      return {
        ...state,
        isSending: true,
        error: null,
        operationId: null,
      };
    case SEND_TRANSACTION_SUCCESS:
      return {
        ...state,
        isSending: false,
        error: null,
        operationId: action.payload.operationId,
      };
    case SEND_TRANSACTION_ERROR:
      return {
        ...state,
        isSending: false,
        error: action.payload.error,
        operationId: null,
      };
    case VALIDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        isToAddressValid: action.payload.isValid,
      };
    case VALIDATE_ADDRESS_ERROR:
      return {
        ...state,
        isToAddressValid: false,
      };
    case LOAD_ZEC_PRICE:
      return { ...state, zecPrice: action.payload.value };
    case RESET_SEND_TRANSACTION:
      return initialState;
    default:
      return state;
  }
};
