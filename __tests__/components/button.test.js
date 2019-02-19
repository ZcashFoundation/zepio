// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { Button } from '../../app/components/button';
import { appTheme } from '../../app/theme';

afterEach(cleanup);

describe('<Button />', () => {
  test('should render primary button correctly', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={appTheme}>
        <Button
          label='Click me!'
          onClick={() => alert('Clicked')} // eslint-disable-line
          variant='primary'
        />
      </ThemeProvider>,
    );

    expect(queryByTestId('PrimaryButton')).toBeInTheDocument();
  });

  test('should render secondary button correctly', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={appTheme}>
        <Button
          label='Click me!'
          onClick={() => alert('Clicked')} // eslint-disable-line
          variant='secondary'
        />
      </ThemeProvider>,
    );

    expect(queryByTestId('SecondaryButton')).toBeInTheDocument();
  });
});
