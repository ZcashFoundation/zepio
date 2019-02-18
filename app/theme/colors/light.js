// @flow

const white = '#FFFFFF';
const whiteHover = '#F9FBFE';
const offWhite = '#F9F9F9';
const black = '#000000';
const text = '#142533';
const secondaryText = '#777777';
const brand = '#5684EB';
const error = '#FF6C6C';
const success = '#66BE54';
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

  // Dropdown
  dropdownBg: white,
  dropdownHoveredBg: offWhite,
  dropdownBorder: border,

  // Buttons
  buttonPrimaryBg: brand,
  buttonPrimaryDisabledBg: brand,
  buttonPrimaryText: white,
  buttonSecondaryBg: '#989898',
  buttonSecondaryDisabledBg: brand,
  buttonSecondaryBorder: '#989898',
  buttonSecondaryText: white,
  buttonSecondaryHoveredBg: '#aaa',

  // Card
  cardBackgroundColor: black,
  sendCardBg: white,
  sendCardBorder: border,

  // Sidebar
  sidebarBg: white,
  sidebarBorderRight: border,
  sidebarLogoGradientBegin: logo,
  sidebarLogoGradientEnd: logo2,
  sidebarHoveredItemLabel: '#8E8E96',
  sidebarItem: '#aaa',
  sidebarItemActive: text,
  sidebarItemHovered: text,
  sidebarItemHoveredBg: offWhite,
  sidebarActiveItemLabel: '#8E8E96',
  sidebarActiveItemBorder: 'red',

  // Transactions
  transactionSent: error,
  transactionReceived: success,
  transactionsDate: secondaryText,
  transactionsItemHovered: '#222222',

  // Transaction Item
  transactionItemBg: white,
  transactionItemHoverBg: whiteHover,
  transactionItemBorder: border,
  transactionItemAddress: '#666666',
  transactionItemAddressHover: '#666666',

  // Transaction Details
  transactionDetailsShadow: `0px 0px 1px 0px ${black}`,
  transactionDetailsBg: white,
  transactionDetailsRowHover: whiteHover,
  transactionDetailsDivider: border,
  transactionDetailsLabel: '#999999',

  // Select
  selectButtonShadow: 'rgba(238,201,76,0.65)',

  // Status Pill
  statusPillLabel: text,
  statusPillBg: '#F9FBFE',
  statusPillBorder: border,

  // QR Code
  qrCodeWrapperBg: white,

  // Header
  headerTitle: text,

  // Wallet Summary
  walletSummaryBg: white,
  walletSummaryBorder: border,

  // Wallet Address
  walletAddressBg: white,
  walletAddressBorder: border,

  // Forms
  inputBg: white,

  // Console
  consoleBg: white,
  consoleBorder: border,

  // Misc
  divider: '#AAAAAA',

  // Input
  inputBorder: border,

  // Settings
  settingsCardBg: white,
  settingsLearnMore: '#a0a0a0',
  settingsLearnMoreHovered: '#000',
};
