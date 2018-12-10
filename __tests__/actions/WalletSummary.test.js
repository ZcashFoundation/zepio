// @flow

import configureStore from 'redux-mock-store';

import { LOAD_WALLET_SUMMARY, loadWalletSummary } from '../../app/redux/modules/wallet';

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
});
