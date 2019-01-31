// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { ColumnComponent } from '../../app/components/column';
import appTheme from '../../app/theme';

afterEach(cleanup);

describe('<ColumnComponent />', () => {
  test('should render correctly', () => {
    // $FlowFixMe
    const { container } = render(
      <ThemeProvider theme={appTheme}>
        <ColumnComponent>
          <h3>ZEC</h3>
          <h3>React</h3>
          <h3>Wallet</h3>
        </ColumnComponent>
      </ThemeProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
