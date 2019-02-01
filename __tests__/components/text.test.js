// @flow

import React from 'react';
import { render, cleanup, queryByText } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { TextComponent } from '../../app/components/text';
import appTheme from '../../app/theme';

afterEach(cleanup);

describe('<TextComponent />', () => {
  test('should render correctly', () => {
    const { container } = render(
      <ThemeProvider theme={appTheme}>
        <TextComponent value='ZEC React Wallet' />
      </ThemeProvider>,
    );

    expect(container).toBeVisible();
  });

  test('should render input label string', () => {
    const { container } = render(
      <ThemeProvider theme={appTheme}>
        <TextComponent value='Test' />
      </ThemeProvider>,
    );

    expect(queryByText(container, /Test/i)).toBeInTheDocument();
  });
});
