// @flow

import 'jest-dom/extend-expect';

import { isHex } from '../../app/utils/is-hex';

describe('isHex', () => {
  test('should check if string is valid hexadecimal number', () => {
    expect(isHex('Zcash')).toEqual(false);
  });
});
