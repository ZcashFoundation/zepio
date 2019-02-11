// @flow

import 'jest-dom/extend-expect';

import { sortBy } from '../../app/utils/sort-by';

describe('truncateAddress', () => {
  test('should truncate ZEC address', () => {
    expect(
      sortBy('id')([{ id: 5 }, { id: 2 }, { id: 1 }, { id: 0 }, { id: 1 }, { id: 1 }]),
    ).toEqual([{ id: 0 }, { id: 1 }, { id: 1 }, { id: 1 }, { id: 2 }, { id: 5 }]);
  });
});
