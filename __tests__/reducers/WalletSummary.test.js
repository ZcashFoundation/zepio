// @flow
import walletSummaryReducer, { LOAD_WALLET_SUMMARY } from '../../app/redux/modules/wallet';

describe('WalletSummary Reducer', () => {
  test('should return the valid initial state', () => {
    const initialState = [];
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: {},
    };

    expect(walletSummaryReducer(undefined, action)).toEqual(initialState);
  });

  test('should load the wallet summary', () => {
    const action = {
      type: LOAD_WALLET_SUMMARY,
      payload: {},
    };
    const expectedState = {
      total: 0,
      shielded: 0,
      transparent: 0,
      error: null,
      isLoading: true,
      dollarValue: 0,
    };

    expect(walletSummaryReducer(undefined, action)).toEqual(expectedState);
  });
});
