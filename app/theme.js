// @flow
import React from 'react';
import theme from 'styled-theming';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
// $FlowFixMe
import { normalize } from 'polished'; // eslint-disable-line

import { DARK } from './constants/themes';

const darkOne = '#7B00DD';
const lightOne = '#ffffff';
const brandOne = '#624cda';
const brandTwo = '#a6ede2';

const appTheme = {
  mode: DARK,
  fontFamily: 'PT Sans',
  colors: {
    primary: theme('mode', {
      light: lightOne,
      dark: darkOne,
    }),
    secondary: theme('mode', {
      light: darkOne,
      dark: lightOne,
    }),
    sidebarBg: brandOne,
    sidebarItem: brandTwo,
    sidebarItemActive: lightOne,
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
