// @flow

import React from 'react';
import { render, cleanup, queryByText } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { EmptyTransactionsComponent } from '../../app/components/empty-transactions';
import { appTheme } from '../../app/theme';

afterEach(cleanup);

describe('<EmptyTransactions />', () => {
  test('should render correctly', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={appTheme}>
        <EmptyTransactionsComponent />
      </ThemeProvider>,
    );

    expect(queryByTestId('NoTransactions')).toBeInTheDocument();
  });

  test('should show label correctly', () => {
    const { container } = render(
      <ThemeProvider theme={appTheme}>
        <EmptyTransactionsComponent />
      </ThemeProvider>,
    );

    expect(queryByText(container, /transactions/i)).toBeInTheDocument();
  });
});
