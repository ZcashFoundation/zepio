// @flow

import configureStore from 'redux-mock-store';

import {
  LOAD_WALLET_SUMMARY,
  LOAD_WALLET_SUMMARY_SUCCESS,
  LOAD_WALLET_SUMMARY_ERROR,
  loadWalletSummary,
  loadWalletSummarySuccess,
  loadWalletSummaryError,
} from '../../app/redux/modules/wallet';

const store = configureStore()();

describe('WalletSummary Actions', () => {
  beforeEach(() => store.clearActions());

  test('should create an action to load wallet summary', () => {
    store.dispatch(loadWalletSummary());

    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        type: LOAD_WALLET_SUMMARY,
      }),
    );
  });

  test('should create an action to load wallet summary', () => {
    const payload = {
      total: 5000,
      transparent: 5000,
      shielded: 5000,
      addresses: [],
    };

    store.dispatch(loadWalletSummarySuccess(payload));

    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        type: LOAD_WALLET_SUMMARY_SUCCESS,
        payload,
      }),
    );
  });

  test('should create an action to load wallet summary with error', () => {
    const payload = {
      error: 'Something went wrong!',
    };

    store.dispatch(loadWalletSummaryError(payload));

    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        type: LOAD_WALLET_SUMMARY_ERROR,
        payload,
      }),
    );
  });
});
