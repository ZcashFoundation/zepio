// @flow
import { getApp } from '../setup/utils';

const app = getApp();

beforeAll(async () => {
  await app.start();
  await app.client.waitUntilWindowLoaded();
  await app.client.waitUntilTextExists('#sidebar', 'Send', 120000);
  await app.client.element('#sidebar a:nth-child(2)').click();
});
afterAll(() => app.stop());

describe('Send', () => {
  it('should load "Send Page"', async () => {
    expect(app.client.element('#send-wrapper').isVisible()).resolves.toEqual(
      true,
    );
  });

  it('should show Additional Options click', async () => {
    expect(
      app.client.element('#send-wrapper #send-fee-wrapper').isVisible(),
    ).resolves.toEqual(false);

    await app.client.element('#send-show-additional-options-button').click();

    expect(
      app.client.element('#send-wrapper #send-fee-wrapper').isVisible(),
    ).resolves.toEqual(true);
  });

  it('disabled send button if required fields are empty', async () => {
    expect(
      app.client.element('#send-submit-button').getAttribute('disabled'),
    ).resolves.toEqual(true);
  });

  it('enable send button if required fields are filled', async () => {
    await app.client.element('#sidebar a:nth-child(1)').click();
    await app.client.element('#sidebar a:nth-child(2)').click();
    await app.client.element('#send-wrapper #select-component').click();
    await app.client
      .element(
        '#send-wrapper #select-component #t3Pnbg7XjP7FGPBUuz75H65aczphHgkpoJW',
      )
      .click();
    await app.client
      .element('#send-wrapper input[name=amount]')
      .setValue('0.484');
    await app.client
      .element('#send-wrapper input[name=to]')
      .setValue('t14oHp2v54vfmdgQ3v3SNuQga8JKHTNi2a1');

    expect(
      expect(
        app.client.element('#send-submit-button').getAttribute('disabled'),
      ).resolves.toEqual(false),
    );
  });
});
