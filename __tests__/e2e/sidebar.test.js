// @flow

import { getApp } from '../setup/utils';

const app = getApp();

beforeAll(async () => {
  await app.start();
  await app.client.waitUntilWindowLoaded();
  await app.client.waitUntilTextExists('#sidebar', 'Dashboard');
});

afterAll(() => app.stop());

describe('Sidebar', () => {
  test('should see the active dashboard route', async () => {
    await app.client.element('#sidebar a:nth-child(1)').click();

    expect(await app.client.getUrl()).toEndWith('/');

    expect(await app.client.element('#sidebar a:nth-child(1)')
      .getHTML()).toEqual(expect.stringContaining('Dashboard'));

    expect(await app.client.element('#sidebar a:nth-child(1) img').getAttribute('src')).toEqual(
      expect.stringContaining('/assets/dashboard_icon_active.svg'),
    );
  });

  test('should see the active send route', async () => {
    await app.client.element('#sidebar a:nth-child(2)').click();

    expect(await app.client.getUrl()).toEndWith('/send');

    expect(await app.client.element('#sidebar a:nth-child(2)')
      .getHTML()).toEqual(expect.stringContaining('Send'));

    expect(await app.client.element('#sidebar a:nth-child(2) img')
      .getAttribute('src')).toEqual(
      expect.stringContaining('/assets/send_icon_active.svg'),
    );
  });

  test('should see the active receive route', async () => {
    await app.client.element('#sidebar a:nth-child(3)').click();

    expect(await app.client.getUrl()).toEndWith('/receive');

    expect(await app.client.element('#sidebar a:nth-child(3)')
      .getHTML()).toEqual(expect.stringContaining('Receive'));

    expect(await app.client.element('#sidebar a:nth-child(3) img')
      .getAttribute('src')).toEqual(
      expect.stringContaining('/assets/receive_icon_active.svg'),
    );
  });

  test('should see the active transactions route', async () => {
    await app.client.element('#sidebar a:nth-child(4)').click();

    expect(await app.client.getUrl()).toEndWith('/transactions');

    expect(await app.client.element('#sidebar a:nth-child(4)')
      .getHTML()).toEqual(expect.stringContaining('Transactions'));

    expect(await app.client.element('#sidebar a:nth-child(4) img')
      .getAttribute('src')).toEqual(
      expect.stringContaining('/assets/transactions_icon_active.svg'),
    );
  });

  test('should see the active settings route', async () => {
    await app.client.element('#sidebar a:nth-child(5)').click();

    expect(await app.client.getUrl()).toEndWith('/settings');

    expect(await app.client.element('#sidebar a:nth-child(5)')
      .getHTML()).toEqual(expect.stringContaining('Settings'));

    expect(await app.client.element('#sidebar a:nth-child(5) img')
      .getAttribute('src')).toEqual(
      expect.stringContaining('/assets/settings_icon_active.svg'),
    );
  });

  test('should see the active console route', async () => {
    await app.client.element('#sidebar a:nth-child(6)').click();

    expect(await app.client.getUrl()).toEndWith('/console');

    expect(await app.client.element('#sidebar a:nth-child(6)')
      .getHTML()).toEqual(expect.stringContaining('Console'));

    expect(await app.client.element('#sidebar a:nth-child(6) img')
      .getAttribute('src')).toEqual(
      expect.stringContaining('/assets/console_icon_active.svg'),
    );
  });
});
