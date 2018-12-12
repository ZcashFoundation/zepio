// @flow

import React from 'react';
import { render } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import 'jest-dom/extend-expect';

import { SidebarComponent } from '../../app/components/sidebar';

describe('<Sidebar />', () => {
  describe('render()', () => {
    test('should render correctly', () => {
      // $FlowFixMe
      const { asFragment } = render(
        <MemoryRouter>
          <SidebarComponent location={{ pathname: '/', hash: '/', search: '' }} />
        </MemoryRouter>,
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
