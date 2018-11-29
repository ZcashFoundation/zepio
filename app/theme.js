// @flow
import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
// $FlowFixMe
import { normalize } from 'polished';
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

/* eslint-disable react/prop-types */
// $FlowFixMe
export const DoczWrapper = ({ children }) => <ThemeProvider theme={appTheme}>{children()}</ThemeProvider>;

export const GlobalStyle = createGlobalStyle`${normalize()}`;

export default appTheme;
