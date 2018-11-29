// @flow

import React from 'react';
import { render } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import 'jest-dom/extend-expect';

import { SidebarComponent } from '../../app/components/sidebar';

describe('<Sidebar />', () => {
  describe('render()', () => {
    test('should render correctly', () => {
      const { asFragment } = render(
        <MemoryRouter>
          <SidebarComponent />
        </MemoryRouter>,
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
