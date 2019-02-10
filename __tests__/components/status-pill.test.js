// @flow

import React from 'react';
import { render, cleanup, queryByText } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { StatusPill } from '../../app/components/status-pill';
import { appTheme } from '../../app/theme';

afterEach(cleanup);

describe('<StatusPill />', () => {
  test('should render status pill correctly', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={appTheme}>
        <StatusPill progress={83.0} type='syncing' />
      </ThemeProvider>,
    );

    expect(queryByTestId('StatusPill')).toBeInTheDocument();
  });

  test('should show percentage on status pill syncing', () => {
    const { container } = render(
      <ThemeProvider theme={appTheme}>
        <StatusPill progress={56.0} type='syncing' />
      </ThemeProvider>,
    );

    expect(queryByText(container, /%/i)).toBeInTheDocument();
  });

  test('should hide percentage on status pill', () => {
    const { container } = render(
      <ThemeProvider theme={appTheme}>
        <StatusPill progress={100.0} type='ready' />
      </ThemeProvider>,
    );

    expect(queryByText(container, /%/i)).not.toBeInTheDocument();
  });

  test('should show error string and hide percentage on status pill', () => {
    const { container } = render(
      <ThemeProvider theme={appTheme}>
        <StatusPill progress={0.0} type='error' />
      </ThemeProvider>,
    );

    expect(queryByText(container, /%/i)).not.toBeInTheDocument();
    expect(queryByText(container, /error/i)).toBeInTheDocument();
  });
});
