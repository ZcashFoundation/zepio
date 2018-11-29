import { getApp } from '../setup/utils';

describe('ZCash', () => {
  const app = getApp();

  beforeEach(() => app.start());
  afterEach(() => {
    app.stop();
  });

  test('should open the window', () => {
    app.client.getWindowCount().then((count) => {
      expect(count).equal(1);
    });
  });
});
