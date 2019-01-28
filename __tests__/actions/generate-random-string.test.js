// @flow
import 'jest-dom/extend-expect';

import generateRandomString from '../../app/utils/generate-random-string';

describe('generate random string', () => {
  test('should generate a random string', () => {
    const credentials = {
      username: generateRandomString(),
      password: generateRandomString(),
    };

    expect(credentials).toEqual({
      username: expect.any(String),
      password: expect.any(String),
    });

  });
})