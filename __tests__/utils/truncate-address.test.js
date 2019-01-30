// @flow
import 'jest-dom/extend-expect';

import { truncateAddress } from '../../app/utils/truncate-address';

describe('truncateAddress', () => {
  test('should truncate ZEC address', () => {
    const myAddress = truncateAddress('t14oHp2v54vfmdgQ3v3SNuQga8JKHTNi2a1');

    const expectedState = 't14oHp2v54vfmdgQ3v3S...8JKHTNi2a1';

    expect(myAddress).toEqual(expectedState);
  });
})