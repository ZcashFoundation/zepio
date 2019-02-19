// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { RowComponent } from '../../app/components/row';
import { appTheme } from '../../app/theme';

afterEach(cleanup);

describe('<RowComponent />', () => {
  test('should render correctly', () => {
    const { container } = render(
      <ThemeProvider theme={appTheme}>
        <RowComponent>
          <h3>ZEC</h3>
          <h3>React</h3>
          <h3>Wallet</h3>
        </RowComponent>
      </ThemeProvider>,
    );

    expect(container).toBeVisible();
  });
});
