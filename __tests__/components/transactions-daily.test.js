// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { TransactionDailyComponent } from '../../app/components/transaction-daily';
import { appTheme } from '../../app/theme';

afterEach(cleanup);

describe('<TransactionDailyComponent />', () => {
  describe('render()', () => {
    test('should render user daily transactions', () => {
      const { container } = render(
        <ThemeProvider theme={appTheme}>
          <TransactionDailyComponent
            transactionsDate={new Date().toISOString()}
            zecPrice={1.345}
            transactions={[
              {
                type: 'receive',
                transactionId: 's0a8das098fgh2348a',
                address: '123456789123456789123456789123456789',
                amount: 1.7891,
                zecPrice: 1.345,
                date: new Date().toISOString(),
                theme: appTheme,
              },
              {
                type: 'send',
                transactionId: '0asd908fgj90f01',
                address: '123456789123456789123456789123456789',
                amount: 0.8458,
                zecPrice: 1.344,
                date: new Date().toISOString(),
                theme: appTheme,
              },
            ]}
          />
        </ThemeProvider>,
      );

      expect(container).toMatchSnapshot();
    });
  });
});
