// @flow

import { BigNumber } from 'bignumber.js';
import 'jest-dom/extend-expect';

import { formatNumber } from '../../app/utils/format-number';

describe('formatNumber', () => {
  test('should append ZEC in balance amount', () => {
    const myBalance = formatNumber({ value: 2.5, append: 'ZEC ' });

    const expectedState = 'ZEC 2.5';

    expect(myBalance).toEqual(expectedState);
  });

  test('should multiply ZEC balance and show it in USD', () => {
    const myBalanceInUsd = formatNumber({
      value: new BigNumber(2.5).times(1.35).toNumber(),
      append: 'USD $',
    });

    const expectedState = 'USD $3.375';

    expect(myBalanceInUsd).toEqual(expectedState);
  });

  test('should multiply decimal ZEC balance and show it in USD', () => {
    const myBalanceInUsd = formatNumber({
      value: new BigNumber(0.1).times(0.2).toNumber(),
      append: 'USD $',
    });

    const expectedState = 'USD $0.02';

    expect(myBalanceInUsd).toEqual(expectedState);
  });
});
