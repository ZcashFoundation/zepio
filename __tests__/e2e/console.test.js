// @flow
import { getApp } from '../setup/utils';

const app = getApp();

beforeAll(async () => {
  await app.start();
  await app.client.waitUntilWindowLoaded();
  await app.client.waitUntilTextExists('#sidebar', 'Console', 120000);
});
afterAll(() => app.stop());

describe('Console', () => {
  it('should load "Console Page"', async () => {
    await app.client.element('#sidebar a:nth-child(6)').click();

    expect(app.client.getText('#header p:first-child')).resolves.toEqual(
      'Console',
    );

    expect(
      app.client.element('#console-wrapper img').getAttribute('src'),
    ).resolves.toEqual(expect.stringContaining('/assets/console_zcash.png'));
  });
});
