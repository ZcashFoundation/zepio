// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { TransactionItemComponent } from '../../app/components/transaction-item';
import { appTheme } from '../../app/theme';

let originalDate;

beforeEach(() => {
  originalDate = global.Date;
  global.Date = class extends Date {
    constructor() {
      super();
      return '2019-03-05T19:58:35.457Z';
    }
  };
});
afterEach(() => {
  global.Date = originalDate;
  cleanup();
});

describe('<TransactionItem />', () => {
  test('should render a transaction item correctly', () => {
    const { container } = render(
      <ThemeProvider theme={appTheme}>
        <TransactionItemComponent
          type='send'
          address='123456789123456789123456789123456789'
          transactionId='a0s9dujo23j0'
          amount={0.8652}
          date={new Date().toString()}
          zecPrice={2.94}
          fees={0.0001}
        />
      </ThemeProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
