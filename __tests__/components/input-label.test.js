// @flow

import React from 'react';
import { render, cleanup, queryByText } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { InputLabelComponent } from '../../app/components/input-label';
import { appTheme } from '../../app/theme';

afterEach(cleanup);

describe('<InputLabelComponent />', () => {
  test('should render correctly', () => {
    const { container } = render(
      <ThemeProvider theme={appTheme}>
        <InputLabelComponent value='From' />
      </ThemeProvider>,
    );

    const label = container.querySelector('p');

    expect(label).toBeVisible();
  });

  test('should render input label string', () => {
    const { container } = render(
      <ThemeProvider theme={appTheme}>
        <InputLabelComponent value='From' />
      </ThemeProvider>,
    );

    expect(queryByText(container, /From/i)).toBeInTheDocument();
  });
});
