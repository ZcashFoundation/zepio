// @flow

const white = '#ffffff';
const text = '#142533';
const brand = '#5684eb';
const brand2 = '#1e5fef';
const error = '#FF6C6C';
const success = '#6AEAC0';

export const LIGHT_COLORS = {
  // General
  background: '#f9f9f9',
  darkOne: brand,
  blackTwo: '#171717',
  lightOne: white,
  brandOne: '#000',
  brandThree: '#5d5d65',
  buttonBorderColor: '#3e3c42',
  activeItem: brand,
  text,

  // Buttons
  buttonPrimaryText: white,
  buttonSecondaryText: text,

  // Card
  cardBackgroundColor: '#000',

  // Sidebar
  sidebarLogoGradientBegin: brand,
  sidebarLogoGradientEnd: brand2,
  sidebarHoveredItem: '#f9f9f9',
  sidebarHoveredItemLabel: '#8e8e96',
  sidebarBg: white,
  sidebarBorderRight: '#ddd',

  // Transactions
  transactionSent: error,
  transactionReceived: success,
  transactionsDate: '#777777',
  transactionsItemHovered: '#222222',
  transactionsDetailsLabel: '#777777',

  // Select
  selectButtonShadow: 'rgba(238,201,76,0.65)',

  // Status
  statusPillLabel: text,
  statusPillBg: '#f2f2f2',
  statusPillBorder: '#ddd',

  // Header
  headerTitle: text,

  // Wallet Summary
  walletSummaryBg: white,
  walletSummaryBorder: '#ddd',

  // Console
  consoleBg: white,

  // Misc
  divider: '#aaa',
};
