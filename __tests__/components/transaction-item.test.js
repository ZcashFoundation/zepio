// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import dateFns from 'date-fns';
import 'jest-dom/extend-expect';

import { TransactionItemComponent } from '../../app/components/transaction-item';
import { appTheme } from '../../app/theme';

let originalDate;
const fixedDate = new Date('2018-02-28T09:39:59');

beforeAll(() => {
  // $FlowFixMe
  dateFns.format = jest.fn(() => '17:01 PM');

  originalDate = global.Date;
  global.Date = class extends Date {
    constructor() {
      super();

      return fixedDate;
    }
  };
});
afterAll(() => {
  global.Date = originalDate;
  // $FlowFixMe
  dateFns.format.mockRestore();
  cleanup();
});

describe('<TransactionItem />', () => {
  test('should render a transaction item correctly', () => {
    const { container } = render(
      <ThemeProvider theme={appTheme}>
        <TransactionItemComponent
          confirmed
          confirmations={10}
          type='send'
          address='123456789123456789123456789123456789'
          transactionId='a0s9dujo23j0'
          amount={0.8652}
          date={new Date().toString()}
          zecPrice={2.94}
        />
      </ThemeProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
