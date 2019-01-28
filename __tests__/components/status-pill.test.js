// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { StatusPill } from '../../app/components/status-pill';
import appTheme from '../../app/theme';

afterEach(cleanup);

describe('<StatusPill />', () => {
  describe('render()', () => {
    test('should render visual component status correctly', () => {
      // $FlowFixMe
      const { asFragment } = render(
        <ThemeProvider theme={appTheme}>
          <MemoryRouter>
            <StatusPill progress={83.} type='syncing' />
          </MemoryRouter>
        </ThemeProvider>,
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
