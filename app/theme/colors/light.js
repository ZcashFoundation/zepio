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
  text,
  background: offWhite,
  divider: '#AAAAAA',
  inactiveItem: success,
  activeItem: brand,

  // Header
  headerTitle: text,

  // Select
  selectButtonShadow: 'rgba(238,201,76,0.65)',

  // Send View (Additional Options Section)
  sendAdditionalOptionsBg: white,
  sendAdditionalOptionsBorder: border,
  sendAdditionalInputBg: offWhite,
  sendAdditionalInputText: white,

  // Dropdown
  dropdownBg: offWhite,
  dropdownHoveredBg: white,
  dropdownBorder: border,
  dropdownIconBorder: '#c1c1c1',
  dropdownOpenedIconBorder: '#828282',

  // Card
  cardBackgroundColor: black,
  sendCardBg: white,
  sendCardBorder: border,

  // Buttons
  buttonPrimaryBg: brand,
  buttonPrimaryDisabledBg: brand,
  buttonPrimaryText: white,
  buttonSecondaryBg: '#989898',
  buttonSecondaryDisabledBg: brand,
  buttonSecondaryBorder: '#989898',
  buttonSecondaryText: white,
  buttonSecondaryHoveredBg: '#aaa',
  buttonBorderColor: '#3E3C42',

  // Transactions
  transactionSent: error,
  transactionReceived: success,
  transactionsDate: secondaryText,
  transactionsItemHovered: '#222222',
  transactionItemBg: white,
  transactionItemHoverBg: whiteHover,
  transactionItemBorder: border,
  transactionItemAddress: '#666666',
  transactionItemAddressHover: '#666666',
  transactionDetailsShadow: `0px 0px 1px 0px ${black}`,
  transactionDetailsBg: white,
  transactionDetailsRowHover: whiteHover,
  transactionDetailsDivider: border,
  transactionDetailsLabel: '#999999',

  // Status Pill
  statusPillLabel: text,
  statusPillBg: '#F9FBFE',
  statusPillBorder: border,

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

  // QR Code
  qrCodeWrapperBg: white,
  qrCodeWrapperBorder: border,

  // Forms
  inputBg: white,
  inputBorder: border,
  inputBorderActive: '#828282',

  // Wallet Summary
  walletSummaryBg: white,
  walletSummaryBorder: border,

  // Wallet Address
  walletAddressBg: white,
  walletAddressBorder: border,
  walletAddressInput: '#666',
  walletAddressInputHovered: black,
  walletAddressTooltip: white,
  walletAddressTooltipBg: black,

  // Console
  consoleBg: white,
  consoleBorder: border,

  // Settings
  settingsCardBg: white,
  settingsLearnMore: '#a0a0a0',
  settingsLearnMoreHovered: '#000',

  // Loading
  loadingScreenBg: black,
  loadingScreenText: white,
};
