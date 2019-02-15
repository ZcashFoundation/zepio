// @flow

import 'jest-dom/extend-expect';

import { getTimestamp } from '../../app/utils/timestamp';

describe('generate timestamp', () => {
  test('should generate a random string', () => {
    const now = getTimestamp();

    expect(now).toEqual(expect.any(Number));
  });
});
