// @flow

import configureStore from 'redux-mock-store';

import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
  loadTransactions,
  loadTransactionsSuccess,
  loadTransactionsError,
} from '../../app/redux/modules/transactions';

const store = configureStore()();

describe('Transactions Actions', () => {
  beforeEach(() => store.clearActions());

  test('should create an action to load transactions', () => {
    store.dispatch(loadTransactions());

    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        type: LOAD_TRANSACTIONS,
      }),
    );
  });

  test('should create an action to load transactions with success', () => {
    const payload = {
      list: [],
      zecPrice: 0,
    };

    store.dispatch(loadTransactionsSuccess(payload));

    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        type: LOAD_TRANSACTIONS_SUCCESS,
        payload,
      }),
    );
  });

  test('should create an action to load transactions with error', () => {
    const payload = {
      error: 'Something went wrong!',
    };

    store.dispatch(loadTransactionsError(payload));

    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        type: LOAD_TRANSACTIONS_ERROR,
        payload,
      }),
    );
  });
});
