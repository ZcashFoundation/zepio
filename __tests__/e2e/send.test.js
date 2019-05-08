// @flow

import { getApp } from '../setup/utils';

const app = getApp();

beforeEach(async () => {
  await app.start();
  await app.client.waitUntilWindowLoaded();
  await app.client.waitUntilTextExists('#sidebar', 'Send');
  await app.client.element('#sidebar a:nth-child(2)').click();
  await app.client.waitUntilTextExists('#status-pill', 'READY');
});

afterEach(async () => {
  if (app.isRunning()) {
    await app.stop();
  }
});

describe('Send', () => {
  test('should load "Send Page"', async () => {
    expect(app.client.element('#send-wrapper').isVisible()).resolves.toEqual(true);
  });

  test('should show Additional Options click', async () => {
    expect(app.client.element('#send-wrapper #send-fee-wrapper').isVisible()).resolves.toEqual(
      false,
    );

    await app.client.element('#send-show-additional-options-button').click();

    expect(app.client.element('#send-wrapper #send-fee-wrapper').isVisible()).resolves.toEqual(
      true,
    );
  });

  test('should disable send button if required fields are empty', async () => {
    expect(app.client.element('#send-submit-button').getAttribute('disabled')).resolves.toEqual(
      true,
    );
  });

  test('should enable send button if required fields are filled', async () => {
    await app.client.element('#sidebar a:nth-child(1)').click();
    await app.client.element('#sidebar a:nth-child(2)').click();
    await app.client.element('#send-wrapper #select-component').click();
    await app.client
      .element('#send-wrapper #select-component #t3Pnbg7XjP7FGPBUuz75H65aczphHgkpoJW')
      .click();
    await app.client.element('#send-wrapper input[name=amount]').setValue('0.484');
    await app.client
      .element('#send-wrapper input[name=to]')
      .setValue('t14oHp2v54vfmdgQ3v3SNuQga8JKHTNi2a1');

    expect(
      expect(app.client.element('#send-submit-button').getAttribute('disabled')).resolves.toEqual(
        false,
      ),
    );
  });

  test('should show confirm transaction modal', async () => {
    await app.client.element('#sidebar a:nth-child(1)').click();
    await app.client.element('#sidebar a:nth-child(2)').click();

    await app.client.element('#send-wrapper #select-component').click();
    await app.client
      .element('#send-wrapper #select-component #t3Pnbg7XjP7FGPBUuz75H65aczphHgkpoJW')
      .click();
    await app.client.element('#send-wrapper input[name=amount]').setValue('0.484');
    await app.client
      .element('#send-wrapper input[name=to]')
      .setValue('tmMEBdrnRRRMKSUUC9SWdSova7V8NmHBqET');

    await app.client.element('#send-submit-button').click();

    expect(app.client.element('#send-confirm-transaction-modal').isVisible()).resolves.toEqual(
      true,
    );
  });

  test('should display a load indicator while the transaction is processed', async () => {
    await app.client.element('#sidebar a:nth-child(1)').click();
    await app.client.element('#sidebar a:nth-child(2)').click();

    await app.client.element('#send-wrapper #select-component').click();
    await app.client
      .element('#send-wrapper #select-component #t3Pnbg7XjP7FGPBUuz75H65aczphHgkpoJW')
      .click();
    await app.client.element('#send-wrapper input[name=amount]').setValue('0.484');
    await app.client
      .element('#send-wrapper input[name=to]')
      .setValue('tmMEBdrnRRRMKSUUC9SWdSova7V8NmHBqET');

    await app.client.element('#send-submit-button').click();
    await app.client.element('#confirm-modal-button').click();

    expect(app.client.getAttribute('#send-confirm-transaction-modal img', 'src')).resolves.toEqual(
      expect.stringContaining('/assets/sync_icon.png'),
    );
    expect(app.client.getText('#send-confirm-transaction-modal p')).resolves.toEqual(
      'Processing transaction...',
    );
    expect(app.client.element('#confirm-modal-button').isVisible()).resolves.toEqual(false);
  });

  test('should show an error in invalid transaction', async () => {
    expect(app.client.element('#send-error-text').isVisible()).resolves.toEqual(false);

    await app.client.element('#sidebar a:nth-child(1)').click();
    await app.client.element('#sidebar a:nth-child(2)').click();
    await app.client.element('#send-wrapper #select-component').click();
    await app.client
      .element('#send-wrapper #select-component #t3Pnbg7XjP7FGPBUuz75H65aczphHgkpoJW')
      .click();
    await app.client.element('#send-wrapper input[name=amount]').setValue('-500');
    await app.client
      .element('#send-wrapper input[name=to]')
      .setValue('tmMEBdrnRRRMKSUUC9SWdSova7V8NmHBqET');

    await app.client.element('#send-submit-button').click();
    await app.client.element('#confirm-modal-button').click();

    expect(
      app.client
        .element('#send-error-message')
        .waitForVisible()
        .isVisible(),
    ).resolves.toEqual(true);
  });

  test('should show a success screen after transaction and show a transaction item', async () => {
    expect(app.client.element('#send-success-wrapper').isVisible()).resolves.toEqual(false);

    await app.client.element('#sidebar a:nth-child(1)').click();
    await app.client.element('#sidebar a:nth-child(2)').click();
    await app.client.element('#send-wrapper #select-component').click();
    await app.client
      .element('#send-wrapper #select-component #t3Pnbg7XjP7FGPBUuz75H65aczphHgkpoJW')
      .click();
    await app.client.element('#send-wrapper input[name=amount]').setValue('0.484');
    await app.client
      .element('#send-wrapper input[name=to]')
      .setValue('t3Pnbg7XjP7FGasduz75HadsdzphHgkadW');

    await app.client.element('#send-submit-button').click();
    await app.client.element('#confirm-modal-button').click();

    await app.client
      .waitForVisible('#send-success-wrapper')
      .element('#send-confirm-transaction-modal button')
      .click();
    await app.client.element('#sidebar a:nth-child(1)').click();

    await app.client.waitUntilTextExists('#transaction-item-operation-id-1', 'Send');

    expect(await app.client.element('#transaction-item-operation-id-1 img').isVisible()).toEqual(
      true,
    );
    expect(
      await app.client.element('#transaction-item-operation-id-1 img').getAttribute('src'),
    ).toEndWith('/assets/transaction_sent_icon_dark.svg');
  });
});
