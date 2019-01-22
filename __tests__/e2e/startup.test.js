// @flow

import { getApp } from '../setup/utils';

const app = getApp();

beforeAll(async () => {
  await app.start();
  await app.client.waitUntilWindowLoaded();
});
afterAll(() => app.stop());

describe('Startup', () => {
  test('should open the window', async () => expect(await app.client.getWindowCount()).toEqual(1));

  test('should have the right title', async () => {
    expect(await app.client.getTitle()).toEqual('ZEC Wallet');
  });

  test('should show the text "ZEC Wallet Starting" in loading screen', async () => {
    expect(await app.client.getText('#loading-screen p')).toEqual(
      'ZEC Wallet Starting',
    );
  });

  test('should show the zcash logo in loading screen', async () => expect(await app.client.getAttribute('#loading-screen img', 'src')).toEqual(
    expect.stringContaining('/assets/zcash-simple-icon.svg'),
  ));

  test('should show the loading circle in loading screen', async () => {
    expect(
      await app.client.element('#loading-screen svg').isExisting(),
    ).toEqual(true);
  });
});
