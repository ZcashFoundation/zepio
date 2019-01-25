// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { Clipboard } from '../../app/components/clipboard';
import appTheme from '../../app/theme';

afterEach(cleanup);

describe('<Clipboard />', () => {
  describe('render()', () => {
    test('should render clipboard component correctly', () => {
      const { container } = render(
        <ThemeProvider theme={appTheme}>
          <Clipboard text='Click me!' />
        </ThemeProvider>,
      );

      expect(container).toMatchSnapshot();
    });
  });
});
