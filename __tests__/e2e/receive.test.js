// @flow

import { getApp } from '../setup/utils';

const app = getApp();

beforeEach(async () => {
  await app.start();
  await app.client.waitUntilWindowLoaded();
  await app.client.waitUntilTextExists('#sidebar', 'Receive');
});

afterEach(() => app.stop());

describe('Receive', () => {
  test('should load "Receive Page"', async () => {
    await app.client.element('#sidebar a:nth-child(3)').click();

    expect(await app.client.getText('#header p:first-child')).toEqual('Receive');

    expect(await app.client.getText('#receive-wrapper #shielded-address-label')).toEqual(
      'SHIELDED ADDRESS',
    );

    expect(
      await app.client.getText('#receive-wrapper #wallet-address #wallet-address-text'),
    ).toEqual('zs1z7rejlpsa98s2rrrfkwmaxu53e4ue0ulcrw0h4x5g8jl04tak0d3mm47vdtahatqrlkngh9sly');

    expect(
      await app.client.getText('#receive-wrapper #wallet-address #wallet-address-balance'),
    ).toEqual('TAZ 5');

    expect(
      await app.client.element('#receive-wrapper #wallet-address #wallet-address-copy').isVisible(),
    ).toEqual(true);

    expect(
      await app.client
        .element('#receive-wrapper #wallet-address #wallet-address-see-qrcode')
        .isVisible(),
    ).toEqual(true);
  });

  test('should copy address on Copy click', async () => {
    await app.client.element('#sidebar a:nth-child(1)').click();
    await app.client.element('#sidebar a:nth-child(3)').click();

    expect(
      await app.client.isExisting('#receive-wrapper #wallet-address #wallet-address-copy-tooltip'),
    ).toEqual(false);

    await app.client.element('#receive-wrapper #wallet-address #wallet-address-copy').click();

    expect(
      await app.client
        .element('#receive-wrapper #wallet-address #wallet-address-copy-tooltip')
        .isVisible(),
    ).toEqual(true);
  });

  test('should show the QRCode area', async () => {
    await app.client.element('#sidebar a:nth-child(1)').click();
    await app.client.element('#sidebar a:nth-child(3)').click();

    expect(
      await app.client.isExisting('#receive-wrapper #wallet-address #wallet-address-qr-code'),
    ).toEqual(false);

    await app.client.element('#receive-wrapper #wallet-address #wallet-address-see-qrcode').click();

    expect(
      await app.client
        .element('#receive-wrapper #wallet-address #wallet-address-qr-code')
        .isVisible(),
    ).toEqual(true);

    expect(
      await app.client.getHTML('#receive-wrapper #wallet-address #wallet-address-qr-code'),
    ).toEqual(expect.stringContaining('canvas'));
  });

  test('should create a new zAddress', async () => {
    await app.client.element('#sidebar a:nth-child(1)').click();
    await app.client.element('#sidebar a:nth-child(3)').click();

    await app.client.element('#receive-wrapper #receive-get-new-shielded').click();
    expect((await app.client.elements('#receive-wrapper #wallet-address')).value.length).toEqual(2);
  });

  test('should show other address types', async () => {
    await app.client.element('#sidebar a:nth-child(1)').click();
    await app.client.element('#sidebar a:nth-child(3)').click();

    await app.client.element('#receive-wrapper #receive-show-other').click();
    expect(
      await app.client
        .element('#receive-wrapper #receive-transparent-addresses-wrapper')
        .isExisting(),
    ).toEqual(true);
  });

  test('should create new transparent addresses', async () => {
    await app.client.element('#sidebar a:nth-child(1)').click();
    await app.client.element('#sidebar a:nth-child(3)').click();

    await app.client.element('#receive-wrapper #receive-show-other').click();
    await app.client
      .element(
        '#receive-wrapper #receive-transparent-addresses-wrapper #receive-get-net-transparent',
      )
      .click();

    expect(
      (await app.client.elements(
        '#receive-wrapper #receive-transparent-addresses-wrapper #wallet-address',
      )).value.length,
    ).toEqual(2);
  });
});
