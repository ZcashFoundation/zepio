// @flow

const white = '#FFFFFF';
const offWhite = '#F9F9F9';
const black = '#000000';
const text = '#142533';
const secondaryText = '#777777';
const brand = '#5684EB';
const error = '#FF6C6C';
const success = '#6AEAC0';
const logo = '#F4B728';
const logo2 = '#FFE240';
const border = '#DDDDDD';

export const LIGHT_COLORS = {
  // General
  background: offWhite,
  text,
  darkOne: brand,
  blackTwo: '#171717',
  lightOne: white,
  brandOne: '#000',
  brandThree: '#5D5D65',
  buttonBorderColor: '#3E3C42',
  activeItem: brand,

  // Buttons
  buttonPrimaryText: white,
  buttonSecondaryText: text,

  // Card
  cardBackgroundColor: black,

  // Sidebar
  sidebarBg: white,
  sidebarBorderRight: border,
  sidebarLogoGradientBegin: logo,
  sidebarLogoGradientEnd: logo2,
  sidebarHoveredItem: offWhite,
  sidebarHoveredItemLabel: '#8E8E96',
  sidebarItem: offWhite,
  sidebarItemLabel: '#8E8E96',
  sidebarActiveItem: 'red',
  sidebarActiveItemLabel: '#8E8E96',
  sidebarActiveItemBorder: 'red',

  // Transactions
  transactionSent: error,
  transactionReceived: success,
  transactionsDate: secondaryText,
  transactionsItemHovered: '#222222',
  transactionsDetailsLabel: secondaryText,

  // Select
  selectButtonShadow: 'rgba(238,201,76,0.65)',

  // Status Pill
  statusPillLabel: text,
  statusPillBg: '#F2F2F2',
  statusPillBorder: border,

  qrCodeWrapperBg: white,

  // Header
  headerTitle: text,

  // Wallet Summary
  walletSummaryBg: white,
  walletSummaryBorder: border,

  // Forms
  inputBg: white,

  // Console
  consoleBg: white,

  // Misc
  divider: '#AAAAAA',
};
