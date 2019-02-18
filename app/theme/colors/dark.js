// @flow

const white = '#FFFFFF';
const text = white;
const brand = '#F4B728';
const brand2 = '#FFE240';
const black = '#000000';
const error = '#FF6C6C';
const success = '#6AEAC0';
const darkBrand = '#212124';
const brandThree = '#5d5d65';

export const DARK_COLORS = {
  darkOne: brand,
  blackTwo: '#171717',
  lightOne: text,
  brandOne: black,
  brandThree: '#5d5d65',
  buttonBorderColor: '#3e3c42',
  activeItem: brand,
  text,
  background: '#212124',

  // Dropdown
  dropdownBg: '#5d5d5d',
  dropdownHoveredBg: '#212124',
  dropdownBorder: '#4e4b4b',

  // Card
  cardBackgroundColor: black,
  sendCardBg: black,
  sendCardBorder: 'transparent',

  // Buttons
  buttonPrimaryText: text,
  buttonSecondaryText: black,

  // Transactions
  transactionSent: error,
  transactionReceived: success,
  transactionsDate: '#777777',
  transactionsItemHovered: '#222222',

  transactionItemBg: black,
  transactionItemHoverBg: '#0A0A0A',
  transactionItemBorder: 'transparent',
  transactionItemAddress: '#A7A7A7',
  transactionItemAddressHover: white,

  transactionDetailsShadow: `0px 0px 20px 0px ${black}`,
  transactionDetailsBg: darkBrand,
  transactionDetailsRowHover: '#1D1D1D',
  transactionDetailsDivider: '#3A3A3A',
  transactionDetailsLabel: '#777777',

  // Status Pill
  statusPillLabel: '#727272',
  statusPillBg: black,
  statusPillBorder: black,

  // Sidebar
  sidebarBg: black,
  sidebarBorderRight: black,
  sidebarLogoGradientBegin: brand,
  sidebarLogoGradientEnd: brand2,
  sidebarHoveredItemLabel: '#8e8e96',
  sidebarActiveItemBorder: 'red',
  sidebarItem: brandThree,
  sidebarItemActive: brand,
  sidebarItemHovered: '#FFF',
  sidebarItemHoveredBg: darkBrand,

  // Misc
  divider: black,
  qrCodeWrapperBg: black,
  headerTitle: text,
  selectButtonShadow: 'rgba(238,201,76,0.65)',

  // Forms
  inputBg: black,

  // Wallet Summary
  walletSummaryBg: black,
  walletSummaryBorder: black,

  // Wallet Address
  walletAddressBg: black,
  walletAddressBorder: black,

  // Console
  consoleBg: black,
  consoleBorder: 'transparent',

  // Input
  inputBorder: 'transparent',
};
