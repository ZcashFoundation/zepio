// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { Button } from '../../app/components/button';
import appTheme from '../../app/theme';

afterEach(cleanup);

describe('<Button />', () => {
  describe('render()', () => {
    test('should render button correctly', () => {
      const { container } = render(
        <ThemeProvider theme={appTheme}>
          <Button
            label='Click me!'
            onClick={() => alert('Clicked')}
          />
        </ThemeProvider>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
