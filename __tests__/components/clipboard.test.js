// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { Clipboard } from '../../app/components/clipboard';
import { appTheme } from '../../app/theme';

afterEach(cleanup);

describe('<Clipboard />', () => {
  test('should render clipboard component correctly', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={appTheme}>
        <Clipboard text='Click me!' />
      </ThemeProvider>,
    );

    expect(queryByTestId('Clipboard')).toBeInTheDocument();
  });

  test('should render clipboard button correctly', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={appTheme}>
        <Clipboard text='Click me!' />
      </ThemeProvider>,
    );

    expect(queryByTestId('PrimaryButton')).toBeInTheDocument();
  });
});
