// @flow
import type { Action } from '../../types/redux';

// Actions
export const LOAD_ADDRESSES_SUCCESS = 'LOAD_ADDRESSES_SUCCESS';
export const LOAD_ADDRESSES_ERROR = 'LOAD_ADDRESSES_ERROR';

export const loadAddressesSuccess = ({ addresses }: { addresses: string[] }) => ({
  type: LOAD_ADDRESSES_SUCCESS,
  payload: {
    addresses,
  },
});

export const loadAddressesError = ({ error }: { error: string }) => ({
  type: LOAD_ADDRESSES_ERROR,
  payload: { error },
});

export type State = {
  addresses: string[],
  error: string | null,
};

const initialState: State = {
  addresses: [],
  error: null,
};

// eslint-disable-next-line
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_ADDRESSES_SUCCESS:
      return {
        error: null,
        addresses: action.payload.addresses,
      };
    case LOAD_ADDRESSES_ERROR:
      return {
        error: action.payload.error,
        addresses: [],
      };
    default:
      return state;
  }
};
