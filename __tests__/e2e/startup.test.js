// @flow

import { getApp } from '../setup/utils';

describe('Zcash', () => {
  const app = getApp();

  beforeEach(() => app.start());
  afterEach(() => {
    app.stop();
  });

  test('should open the window', () => {
    app.client
      .getWindowCount()
      .then((count: number) => expect(count).toEqual(1));
  });
});
