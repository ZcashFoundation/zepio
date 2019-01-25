// @flow

import { getApp } from '../setup/utils';

const app = getApp();

beforeAll(async () => {
  await app.start();
  await app.client.waitUntilWindowLoaded();
});
afterAll(() => app.stop());

describe('Startup', () => {
  test('should open the window', () => expect(app.client.getWindowCount()).resolves.toEqual(1));

  test('should have the right title', () => {
    expect(app.client.getTitle()).resolves.toEqual('ZEC Wallet');
  });

  test('should show the text "ZEC Wallet Starting" in loading screen', async () => expect(app.client.element('#loading-screen:first-child p').getHTML()).resolves.toEqual(
    expect.stringContaining('ZEC Wallet Starting'),
  ));

  test('should show the zcash logo in loading screen', () => expect(app.client.getAttribute('#loading-screen:first-child img', 'src')).resolves.toEqual(
    expect.stringContaining('/assets/zcash-simple-icon.svg'),
  ));

  test('should show the loading circle in loading screen', () => {
    expect(app.client.element('#loading-screen svg').isExisting()).resolves.toEqual(true);
  });
});
