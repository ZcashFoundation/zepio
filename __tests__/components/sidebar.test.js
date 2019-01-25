// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { SidebarComponent } from '../../app/components/sidebar';
import appTheme from '../../app/theme';

afterEach(cleanup);

describe('<SidebarComponent />', () => {
  describe('render()', () => {
    test('should render correctly', () => {
      // $FlowFixMe
      const { asFragment } = render(
        <ThemeProvider theme={appTheme}>
          <MemoryRouter>
            <SidebarComponent location={{ pathname: '/', hash: '/', search: '' }} />
          </MemoryRouter>
        </ThemeProvider>,
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
