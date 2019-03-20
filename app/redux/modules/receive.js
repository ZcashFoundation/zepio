// @flow

import type { Action } from '../../types/redux';

// Actions
export const LOAD_ADDRESSES_SUCCESS = 'LOAD_ADDRESSES_SUCCESS';
export const LOAD_ADDRESSES_ERROR = 'LOAD_ADDRESSES_ERROR';
export const GET_NEW_ADDRESS_SUCCESS = 'GET_NEW_ADDRESS_SUCCESS';
export const GET_NEW_ADDRESS_ERROR = 'GET_NEW_ADDRESS_ERROR';

export const loadAddressesSuccess = ({
  addresses,
}: {
  addresses: { address: string, balance: number }[],
}) => ({
  type: LOAD_ADDRESSES_SUCCESS,
  payload: {
    addresses,
  },
});

export const loadAddressesError = ({ error }: { error: string }) => ({
  type: LOAD_ADDRESSES_ERROR,
  payload: { error },
});

export const getNewAddressSuccess = ({ address }: { address: string }) => ({
  type: GET_NEW_ADDRESS_SUCCESS,
  payload: {
    address,
  },
});

export const getNewAddressError = ({ error }: { error: string }) => ({
  type: GET_NEW_ADDRESS_ERROR,
  payload: {
    error,
  },
});

export type addressType = 'transparent' | 'shielded';

export type State = {
  addresses: { address: string, balance: number }[],
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
    case GET_NEW_ADDRESS_SUCCESS:
      return {
        error: null,
        addresses: [...state.addresses, { address: action.payload.address, balance: 0 }],
      };
    case GET_NEW_ADDRESS_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
