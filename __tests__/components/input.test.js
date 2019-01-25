// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { InputComponent } from '../../app/components/input';
import appTheme from '../../app/theme';

afterEach(cleanup);

describe('<InputComponent />', () => {
  describe('render()', () => {
    test('should render text input correctly', () => {
      const { container } = render(
        <ThemeProvider theme={appTheme}>
          <InputComponent
            inputType='input'
            value='Hello World!'
            onChange={console.log}
          />
        </ThemeProvider>
      );

      expect(container).toMatchSnapshot();
    });

    test('should render textarea correctly', () => {
      const { container } = render(
        <ThemeProvider theme={appTheme}>
          <InputComponent
            inputType='textarea'
            value='I am Zcash Electron Wallet'
            onChange={console.log}
            rows={10}
          />
        </ThemeProvider>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
