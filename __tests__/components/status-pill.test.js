// @flow

import React from 'react';
import { render, cleanup, queryByText } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { StatusPill } from '../../app/components/status-pill';
import { appTheme } from '../../app/theme';

afterEach(cleanup);

describe('<StatusPill />', () => {
  test('should show percentage on status pill syncing', () => {
    const { container } = render(
      <ThemeProvider theme={appTheme}>
        <StatusPill
          getBlockchainStatus={() => Promise.resolve()}
          nodeSyncProgress={56.0}
          nodeSyncType='syncing'
          isRefetching={false}
        />
      </ThemeProvider>,
    );

    expect(queryByText(container, /%/i)).toBeInTheDocument();
  });

  test('should hide percentage on status pill', () => {
    const { container } = render(
      <ThemeProvider theme={appTheme}>
        <StatusPill
          getBlockchainStatus={() => Promise.resolve()}
          nodeSyncProgress={100.0}
          nodeSyncType='ready'
          isRefetching={false}
        />
      </ThemeProvider>,
    );

    expect(queryByText(container, /%/i)).not.toBeInTheDocument();
  });

  test('should show error string and hide percentage on status pill', () => {
    const { container } = render(
      <ThemeProvider theme={appTheme}>
        <StatusPill
          getBlockchainStatus={() => Promise.resolve()}
          nodeSyncProgress={0.0}
          nodeSyncType='error'
          isRefetching={false}
        />
      </ThemeProvider>,
    );

    expect(queryByText(container, /%/i)).not.toBeInTheDocument();
    expect(queryByText(container, /error/i)).toBeInTheDocument();
  });
});
