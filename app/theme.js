// @flow
import React, { Fragment } from 'react';
import theme from 'styled-theming';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
// $FlowFixMe
import { normalize } from 'polished'; // eslint-disable-line

import { DARK } from './constants/themes';

const darkOne = '#7B00DD';
const lightOne = '#ffffff';
const brandOne = '#000';
const brandTwo = '#3B3B3F';
const activeItem = '#F5CB00';
const text = '#FFF';
const cardBackgroundColor = '#000';
const sidebarLogoGradientBegin = '#F4B728';
const sidebarLogoGradientEnd = '#FFE240';
const background = '#212124';

const appTheme = {
  mode: DARK,
  fontFamily: 'PT Sans',
  fontWeight: {
    bold: 700,
    default: 400,
  },
  fontSize: {
    title: 1.25,
    text: 0.9375,
    zecValueBase: 1.125,
  },
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
    sidebarItemActive: activeItem,
    cardBackgroundColor,
    text,
    activeItem,
    inactiveItem: brandTwo,
    sidebarLogoGradientBegin,
    sidebarLogoGradientEnd,
    background,
  },
  sidebarWidth: '200px',
  headerHeight: '60px',
  layoutPaddingLeft: '50px',
  layoutPaddingRight: '45px',
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
