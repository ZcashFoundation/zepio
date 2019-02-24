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
  // General
  text,
  background: '#212124',
  divider: black,
  inactiveItem: brandThree,
  activeItem: brand,

  // Header
  headerTitle: text,

  // Select
  selectButtonShadow: 'rgba(238,201,76,0.65)',

  // Send View (Additional Options Section)
  sendAdditionalOptionsBg: black,
  sendAdditionalOptionsBorder: black,
  sendAdditionalInputBg: darkBrand,
  sendAdditionalInputText: white,

  // Dropdown
  dropdownBg: '#5d5d5d',
  dropdownHoveredBg: '#212124',
  dropdownBorder: '#4e4b4b',
  dropdownIconBorder: '#828282',
  dropdownOpenedIconBorder: '#ddd',

  // Card
  cardBackgroundColor: black,
  sendCardBg: black,
  sendCardBorder: 'transparent',

  // Buttons
  buttonPrimaryBg: brand,
  buttonPrimaryDisabledBg: brand,
  buttonPrimaryText: black,
  buttonSecondaryBg: '#ddd',
  buttonSecondaryDisabledBg: brand,
  buttonSecondaryText: black,
  buttonSecondaryBorder: '#ddd',
  buttonSecondaryHoveredBg: '#bbb',
  buttonBorderColor: '#3e3c42',

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
  transactionLabelText: '#777777',
  transactionLabelTextHovered: white,

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

  // QRCode
  qrCodeWrapperBg: black,
  qrCodeWrapperBorder: black,

  // Forms
  inputBg: black,
  inputBorder: 'transparent',
  inputBorderActive: '#222',

  // Wallet Summary
  walletSummaryBg: black,
  walletSummaryBorder: black,

  // Wallet Address
  walletAddressBg: black,
  walletAddressBorder: black,
  walletAddressInput: '#828282',
  walletAddressInputHovered: white,
  walletAddressTooltip: black,
  walletAddressTooltipBg: white,

  // Console
  consoleBg: black,
  consoleBorder: 'transparent',

  // Settings
  settingsCardBg: black,
  settingsLearnMore: '#AAAAAA',
  settingsLearnMoreHovered: '#fff',

  // Loading
  loadingScreenBg: black,
  loadingScreenText: white,
};
