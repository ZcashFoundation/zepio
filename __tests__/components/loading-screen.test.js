// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { LoadingScreen } from '../../app/components/loading-screen';
import { appTheme } from '../../app/theme';

afterEach(cleanup);

describe('<LoadingScreen />', () => {
  test('should render status pill correctly', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={appTheme}>
        <LoadingScreen progress={83.0} />
      </ThemeProvider>,
    );

    expect(queryByTestId('LoadingScreen')).toBeInTheDocument();
  });
});
