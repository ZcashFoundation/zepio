// @flow

import React, { Fragment, type Node } from 'react';
import theme from 'styled-theming';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
// $FlowFixMe
import { normalize } from 'polished'; // eslint-disable-line

import { DARK } from './constants/themes';

const darkOne = '#F4B728';
const blackTwo = '#171717';
const lightOne = '#ffffff';
const brandOne = '#000';
const brandThree = '#5d5d65';
const buttonBorderColor = '#3e3c42';
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

const appTheme: AppTheme = {
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
    sidebarBg: theme('mode', {
      light: brandOne,
      dark: brandOne,
    }),
    sidebarItem: theme('mode', {
      light: brandThree,
      dark: brandThree,
    }),
    sidebarItemActive: theme('mode', {
      light: activeItem,
      dark: activeItem,
    }),
    sidebarHoveredItem: theme('mode', {
      light: sidebarHoveredItem,
      dark: sidebarHoveredItem,
    }),
    sidebarHoveredItemLabel: theme('mode', {
      light: sidebarHoveredItemLabel,
      dark: sidebarHoveredItemLabel,
    }),
    cardBackgroundColor: theme('mode', {
      light: cardBackgroundColor,
      dark: cardBackgroundColor,
    }),
    text: theme('mode', {
      light: '#000',
      dark: text,
    }),
    activeItem: theme('mode', {
      light: activeItem,
      dark: activeItem,
    }),
    inactiveItem: theme('mode', {
      light: brandThree,
      dark: brandThree,
    }),
    sidebarLogoGradientBegin: theme('mode', {
      light: sidebarLogoGradientBegin,
      dark: sidebarLogoGradientBegin,
    }),
    sidebarLogoGradientEnd: theme('mode', {
      light: sidebarLogoGradientEnd,
      dark: sidebarLogoGradientEnd,
    }),
    background: theme('mode', {
      light: '#FFF',
      dark: background,
    }),
    transactionSent: theme('mode', {
      light: transactionSent,
      dark: transactionSent,
    }),
    transactionReceived: theme('mode', {
      light: transactionReceived,
      dark: transactionReceived,
    }),
    transactionsDate: theme('mode', {
      light: transactionsDate,
      dark: transactionsDate,
    }),
    transactionsItemHovered: theme('mode', {
      light: transactionsItemHovered,
      dark: transactionsItemHovered,
    }),
    inputBackground: theme('mode', {
      light: brandOne,
      dark: brandOne,
    }),
    selectButtonShadow: theme('mode', {
      light: selectButtonShadow,
      dark: selectButtonShadow,
    }),
    transactionsDetailsLabel: theme('mode', {
      light: transactionsDetailsLabel,
      dark: transactionsDetailsLabel,
    }),
    statusPillLabel: theme('mode', {
      light: statusPillLabel,
      dark: statusPillLabel,
    }),
    modalItemLabel: theme('mode', {
      light: transactionsDate,
      dark: transactionsDate,
    }),
    blackTwo: theme('mode', {
      light: blackTwo,
      dark: blackTwo,
    }),
    buttonBorderColor: theme('mode', {
      light: buttonBorderColor,
      dark: buttonBorderColor,
    }),
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

export const DoczWrapper = ({ children }: { children: () => Node<*> }) => (
  <ThemeProvider theme={appTheme}>
    <Fragment>
      <GlobalStyle />
      {children()}
    </Fragment>
  </ThemeProvider>
);

// eslint-disable-next-line
export default appTheme;
