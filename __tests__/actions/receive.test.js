// @flow

import configureStore from 'redux-mock-store';

import {
  LOAD_ADDRESSES_SUCCESS,
  LOAD_ADDRESSES_ERROR,
  loadAddressesSuccess,
  loadAddressesError,
} from '../../app/redux/modules/receive';

const store = configureStore()();

describe('Receive Actions', () => {
  beforeEach(() => store.clearActions());

  test('should create an action to load addresses with success', () => {
    const payload = {
      addresses: [
        { address: 'tm0a9si0ds09gj02jj', balance: 10 },
        { address: 'smas098gk02jf0kskk', balance: 20 },
      ],
    };

    store.dispatch(loadAddressesSuccess(payload));

    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        type: LOAD_ADDRESSES_SUCCESS,
        payload,
      }),
    );
  });

  test('should create an action to load addresses with error', () => {
    const payload = {
      error: 'Something went wrong!',
    };

    store.dispatch(loadAddressesError(payload));

    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        type: LOAD_ADDRESSES_ERROR,
        payload,
      }),
    );
  });
});
