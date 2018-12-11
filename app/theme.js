// @flow
import React, { Fragment } from 'react';
import theme from 'styled-theming';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
// $FlowFixMe
import { normalize } from 'polished'; // eslint-disable-line

import { DARK } from './constants/themes';

const darkOne = '#7B00DD';
const lightOne = '#ffffff';
const brandOne = '#624cda';
const brandTwo = '#a6ede2';
const activeItem = '#F5CB00';
const text = '#FFF';
const cardBackgroundColor = '#000';

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
    cardBackgroundColor,
    text,
    activeItem,
  },
  size: {
    title: 18,
    paragraph: 12,
  },
};

export const GlobalStyle = createGlobalStyle`
  ${normalize()}

  * {
    box-sizing: border-box;
  }
`;

/* eslint-disable react/prop-types */
// $FlowFixMe
export const DoczWrapper = ({ children }) => (
  <ThemeProvider theme={appTheme}>
    <Fragment>
      <GlobalStyle />
      {children()}
    </Fragment>
  </ThemeProvider>
);

export default appTheme;
