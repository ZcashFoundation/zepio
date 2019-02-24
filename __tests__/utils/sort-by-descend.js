// @flow

import 'jest-dom/extend-expect';

import { sortByDescend } from '../../app/utils/sort-by-descend';

describe('truncateAddress', () => {
  test('should truncate ZEC address', () => {
    expect(
      sortByDescend('id')([{ id: 5 }, { id: 2 }, { id: 1 }, { id: 0 }, { id: 1 }, { id: 1 }]),
    ).toEqual([{ id: 5 }, { id: 2 }, { id: 1 }, { id: 1 }, { id: 1 }, { id: 0 }]);
  });
});
