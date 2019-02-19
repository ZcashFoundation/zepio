// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { Divider } from '../../app/components/divider';
import { appTheme } from '../../app/theme';

afterEach(cleanup);

describe('<Divider />', () => {
  test('should render correctly', () => {
    const { container } = render(
      <ThemeProvider theme={appTheme}>
        <Divider opacity={0.3} />
      </ThemeProvider>,
    );

    const divider = container.querySelector('div');

    expect(divider).toBeVisible();
    expect(divider).toHaveStyle('opacity: 0.3');
  });
});
