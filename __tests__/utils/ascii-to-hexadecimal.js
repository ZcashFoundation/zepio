// @flow

import 'jest-dom/extend-expect';

import { ascii2hex } from '../../app/utils/ascii-to-hexadecimal';

describe('filterObjectNullKeys', () => {
  test('should filter null keys from object', () => {
    expect(ascii2hex('zcash')).toEqual('7a63617368');
    expect(ascii2hex('some text with spaces')).toEqual(
      '736f6d652074657874207769746820737061636573',
    );
    expect(ascii2hex('0')).toEqual('30');
    expect(ascii2hex('16')).toEqual('3136');
    expect(ascii2hex()).toEqual('');
    expect(ascii2hex('')).toEqual('');
  });
});
