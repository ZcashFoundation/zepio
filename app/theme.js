// @flow
import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'styled-theming';

import { DARK } from './constants/themes';

const appTheme = {
  mode: DARK,
  fontFamily: 'Open Sans',
  colors: {
    primary: theme('mode', {
      light: '#fff',
      dark: '#000',
    }),
    secondary: theme('mode', {
      light: '#000',
      dark: '#fff',
    }),
  },
  size: {
    title: 18,
    paragraph: 12,
  },
};

export default appTheme;

/* eslint-disable react/prop-types */
// $FlowFixMe
export const DoczWrapper = ({ children }) => <ThemeProvider theme={appTheme}>{children()}</ThemeProvider>;
