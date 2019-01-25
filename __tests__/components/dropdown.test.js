// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { DropdownComponent } from '../../app/components/dropdown';
import { Button } from '../../app/components/button';
import appTheme from '../../app/theme';

afterEach(cleanup);

describe('<DropdownComponent />', () => {
  describe('render()', () => {
    test('should render dropdown correctly', () => {
      const { container } = render(
        <ThemeProvider theme={appTheme}>
          <div style={{ height: '500px' }}>
            <DropdownComponent
              label='Addresses'
              renderTrigger={toggleVisibility => (
                <Button
                  label='Show Dropdown'
                  onClick={toggleVisibility}
                />
              )}
              options={[
                { label: 'asbh1yeasbdh23848asdasd', onClick: console.log },
                { label: 'urtyruhjr374hbfdjdhuh', onClick: console.log },
              ]}
            />
          </div>
        </ThemeProvider>,
      );

      expect(container).toMatchSnapshot();
    });
  });
});
