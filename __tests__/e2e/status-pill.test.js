// @flow

import { getApp } from '../setup/utils';

const app = getApp();

beforeAll(async () => {
  await app.start();
  await app.client.waitUntilWindowLoaded();
  await app.client.waitUntilTextExists('#sidebar', 'Dashboard');
});

afterAll(() => app.stop());

describe('Status Pill', () => {
  test('should show status pill in the header', async () => expect(
    app.client.waitUntilTextExists('#status-pill', 'READY', 30000).getText('#status-pill'),
  ).resolves.toEqual(expect.stringContaining('READY')));
});
