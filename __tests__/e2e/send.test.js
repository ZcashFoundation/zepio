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
  test('should load "Send Page"', async () => {
    expect(app.client.element('#send-wrapper').isVisible()).resolves.toEqual(
      true,
    );
  });

  test('should show Additional Options click', async () => {
    expect(
      app.client.element('#send-wrapper #send-fee-wrapper').isVisible(),
    ).resolves.toEqual(false);

    await app.client.element('#send-show-additional-options-button').click();

    expect(
      app.client.element('#send-wrapper #send-fee-wrapper').isVisible(),
    ).resolves.toEqual(true);
  });

  test('should disable send button if required fields are empty', async () => {
    expect(
      app.client.element('#send-submit-button').getAttribute('disabled'),
    ).resolves.toEqual(true);
  });

  test('should enable send button if required fields are filled', async () => {
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

  test('should show an error in invalid transaction', async () => {
    expect(app.client.element('#send-error-text').isVisible()).resolves.toEqual(
      false,
    );

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
      .setValue('InvalidTOAddress');

    await app.client.element('#send-submit-button').click();

    expect(app.client.element('#send-error-text').isVisible()).resolves.toEqual(
      true,
    );
  });

  test('should show a success screen after transaction and show a transaction item', async () => {
    expect(
      app.client.element('#send-success-wrapper').isVisible(),
    ).resolves.toEqual(false);

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
      .setValue('t3Pnbg7XjP7FGasduz75HadsdzphHgkadW');

    await app.client.element('#send-submit-button').click();

    expect(
      app.client.element('#send-success-wrapper').isVisible(),
    ).resolves.toEqual(true);

    const successComponents = await app.client
      .elements('#send-success-wrapper p')
      .getText();

    expect(successComponents[0]).toEqual(
      'Processing operation: operation-id-1',
    );
    expect(successComponents[1]).toEqual('Amount: 0.484');
    expect(successComponents[2]).toEqual(
      'From: t3Pnbg7XjP7FGPBUuz75H65aczphHgkpoJW',
    );
    expect(successComponents[3]).toEqual(
      'To: t3Pnbg7XjP7FGasduz75HadsdzphHgkadW',
    );

    await app.client.element('#sidebar a:nth-child(1)').click();

    await app.client.waitUntilTextExists(
      '#transaction-item-operation-id-1',
      'Send',
    );

    expect(
      await app.client
        .element('#transaction-item-operation-id-1 img')
        .isVisible(),
    ).toEqual(true);

    expect(
      await app.client

        .element('#transaction-item-operation-id-1 img')
        .getAttribute('src'),
    ).toEndWith('/assets/transaction_sent_icon.svg');
  });
});
