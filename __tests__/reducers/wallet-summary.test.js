// @flow
import walletSummaryReducer, {
  LOAD_WALLET_SUMMARY,
  LOAD_WALLET_SUMMARY_SUCCESS,
  LOAD_WALLET_SUMMARY_ERROR,
} from '../../app/redux/modules/wallet';

describe('WalletSummary Reducer', () => {
  test('should return the valid initial state', () => {
    const initialState = {
      total: 0,
      shielded: 0,
      transparent: 0,
      error: null,
      isLoading: false,
      dollarValue: 0,
    };
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

  test('should load the wallet summary with success', () => {
    const action = {
      type: LOAD_WALLET_SUMMARY_SUCCESS,
      payload: {
        total: 1000,
        transparent: 1000,
        shielded: 1000,
      },
    };
    const expectedState = {
      ...action.payload,
      error: null,
      isLoading: false,
      dollarValue: 0,
    };

    expect(walletSummaryReducer(undefined, action)).toEqual(expectedState);
  });

  test('should load the wallet summary with error', () => {
    const action = {
      type: LOAD_WALLET_SUMMARY_ERROR,
      payload: {
        error: 'Something went wrong',
      },
    };
    const expectedState = {
      total: 0,
      shielded: 0,
      transparent: 0,
      error: action.payload.error,
      isLoading: false,
      dollarValue: 0,
    };

    expect(walletSummaryReducer(undefined, action)).toEqual(expectedState);
  });
});
