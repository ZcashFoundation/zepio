// @flow
import React, { Fragment } from 'react';
import theme from 'styled-theming';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
// $FlowFixMe
import { normalize } from 'polished'; // eslint-disable-line

import { DARK } from './constants/themes';

const darkOne = '#F4B728';
const lightOne = '#ffffff';
const brandOne = '#000';
// const brandTwo = '#3B3B3F';
const brandThree = '#5d5d65';
const activeItem = '#F4B728';
const text = '#FFF';
const cardBackgroundColor = '#000';
const sidebarLogoGradientBegin = '#F4B728';
const sidebarLogoGradientEnd = '#FFE240';
const sidebarHoveredItem = '#1C1C1C';
const sidebarHoveredItemLabel = '#8e8e96';
const background = '#212124';
const transactionSent = '#FF6C6C';
const transactionReceived = '#6AEAC0';
const transactionsDate = '#777777';
const transactionsItemHovered = '#222222';
const selectButtonShadow = 'rgba(238,201,76,0.65)';
const statusPillLabel = '#727272';
const transactionsDetailsLabel = transactionsDate;

const appTheme = {
  mode: DARK,
  fontFamily: 'Roboto',
  fontWeight: {
    bold: 700,
    default: 400,
    light: 300,
  },
  fontSize: {
    large: 1.25,
    medium: 1.125,
    regular: 0.84375,
    small: 0.667,
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
    sidebarItem: brandThree,
    sidebarItemActive: activeItem,
    sidebarHoveredItem,
    sidebarHoveredItemLabel,
    cardBackgroundColor,
    text,
    activeItem,
    inactiveItem: brandThree,
    sidebarLogoGradientBegin,
    sidebarLogoGradientEnd,
    background,
    transactionSent,
    transactionReceived,
    transactionsDate,
    transactionsItemHovered,
    inputBackground: brandOne,
    selectButtonShadow,
    transactionsDetailsLabel,
    statusPillLabel,
  },
  sidebarWidth: '180px',
  headerHeight: '60px',
  layoutPaddingLeft: '35px',
  layoutPaddingRight: '35px',
  layoutContentPaddingTop: '20px',
  boxBorderRadius: '3px',
  transitionEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
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
