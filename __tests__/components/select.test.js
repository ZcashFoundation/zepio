// @flow

import React from 'react';
import { render, cleanup, queryByText } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import 'jest-dom/extend-expect';

import { SelectComponent } from '../../app/components/select';
import { appTheme } from '../../app/theme';

afterEach(cleanup);

describe('<SelectComponent />', () => {
  test('should generate snapshot correctly', () => {
    const { container } = render(
      <ThemeProvider theme={appTheme}>
        <SelectComponent
          onChange={console.log} // eslint-disable-line
          value='asbh1yeasbdh23848asdasd'
          placeholder='Select a address'
          options={[
            { label: 'asbh1yeasbdh23848asdasd', value: '1' },
            { label: 'urtyruhjr374hbfdjdhuh', value: '1' },
          ]}
        />
      </ThemeProvider>,
    );

    expect(container).toBeVisible();
  });

  test('should render correctly', () => {
    const { queryByTestId } = render(
      <ThemeProvider theme={appTheme}>
        <SelectComponent
          onChange={console.log} // eslint-disable-line
          value='asbh1yeasbdh23848asdasd'
          placeholder='Select a address'
          options={[
            { label: 'asbh1yeasbdh23848asdasd', value: '1' },
            { label: 'urtyruhjr374hbfdjdhuh', value: '1' },
          ]}
        />
      </ThemeProvider>,
    );

    expect(queryByTestId('Select')).toBeInTheDocument();
  });

  test('should render select trigger string', () => {
    const { container } = render(
      <ThemeProvider theme={appTheme}>
        <SelectComponent
          onChange={console.log} // eslint-disable-line
          value='asbh1yeasbdh23848asdasd'
          placeholder='Select a address'
          options={[
            { label: 'asbh1yeasbdh23848asdasd', value: '1' },
            { label: 'urtyruhjr374hbfdjdhuh', value: '1' },
          ]}
        />
      </ThemeProvider>,
    );

    expect(queryByText(container, /Select/i)).toBeInTheDocument();
  });
});
