// @flow

import 'jest-dom/extend-expect';

import { filterObjectNullKeys } from '../../app/utils/filter-object-null-keys';

describe('filterObjectNullKeys', () => {
  test('should filter null keys from object', () => {
    const initialState = {
      name: 'John Doe',
      address: null,
      amount: 0,
      transactions: undefined,
    };

    const expectedState = {
      name: 'John Doe',
      amount: 0,
    };

    expect(filterObjectNullKeys(initialState)).toEqual(expectedState);
  });
});
