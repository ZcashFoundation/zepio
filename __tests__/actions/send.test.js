// @flow

import configureStore from 'redux-mock-store';

import {
  SEND_TRANSACTION,
  SEND_TRANSACTION_SUCCESS,
  SEND_TRANSACTION_ERROR,
  RESET_SEND_TRANSACTION,
  VALIDATE_ADDRESS_SUCCESS,
  VALIDATE_ADDRESS_ERROR,
  LOAD_ZEC_PRICE,
  sendTransaction,
  sendTransactionSuccess,
  sendTransactionError,
  resetSendTransaction,
  validateAddressSuccess,
  validateAddressError,
  loadZECPrice,
} from '../../app/redux/modules/send';

const store = configureStore()();

describe('Send Actions', () => {
  beforeEach(() => store.clearActions());

  test('should create an action to send a transaction', () => {
    store.dispatch(sendTransaction());

    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        type: SEND_TRANSACTION,
      }),
    );
  });

  test('should create an action to send transaction with success', () => {
    const payload = {
      operationId: '0b9ii4590ab-1d012klfo',
    };

    store.dispatch(sendTransactionSuccess(payload));

    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        type: SEND_TRANSACTION_SUCCESS,
        payload,
      }),
    );
  });

  test('should create an action to send transaction with error', () => {
    const payload = {
      error: 'Something went wrong!',
    };

    store.dispatch(sendTransactionError(payload));

    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        type: SEND_TRANSACTION_ERROR,
        payload,
      }),
    );
  });

  test('should reset a transaction', () => {
    store.dispatch(resetSendTransaction());

    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        type: RESET_SEND_TRANSACTION,
      }),
    );
  });

  test('should validate a address with success', () => {
    const payload = {
      isValid: true,
    };

    store.dispatch(validateAddressSuccess(payload));

    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        type: VALIDATE_ADDRESS_SUCCESS,
        payload,
      }),
    );
  });

  test('should validate a address with error', () => {
    store.dispatch(validateAddressError());

    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        type: VALIDATE_ADDRESS_ERROR,
      }),
    );
  });

  test('should load ZEC price', () => {
    const payload = {
      value: 1.35,
    };

    store.dispatch(loadZECPrice(payload));

    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        type: LOAD_ZEC_PRICE,
        payload,
      }),
    );
  });
});
