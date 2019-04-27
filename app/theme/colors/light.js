// @flow
// Colors named with: chir.ag/projects/name-that-color/

// Lights
const white = '#FFFFFF';
const whiteHover = '#F9FBFE';
const offWhite = '#F9F9F9';
const alto = '#DDDDDD';
const silver = '#C1C1C1';
const silverChalice = '#AAAAAA';
const boulder = '#A0A0A0';
const doveGray = '#666666';
const starDust = '#777777';

// Darks
const black = '#000000';
const text = '#142533';
const mineShaft = '#222222';
const shipGray = '#3E3C42';
const scorpion = '#989898';
const dustyGray = '#999999';
const bitter = '#828282';
const manatee = '#8E8E96';

// Colors
const error = '#FF6C6C';
const success = '#66BE54';
const cornflowerBlue = '#5684EB';
const saffron = '#F4B728';
const brightSun = '#FFE240';
const offBrand = 'rgba(238,201,76,0.65)';

export const LIGHT_COLORS = {
  // General
  text,
  success,
  error,
  background: offWhite,
  divider: silverChalice,
  inactiveItem: success,
  activeItem: cornflowerBlue,

  // Header
  headerTitle: text,

  // Select
  selectButtonShadow: offBrand,

  // Send View (Additional Options Section)
  sendAdditionalOptionsBg: white,
  sendAdditionalOptionsBorder: alto,
  sendAdditionalInputBg: offWhite,
  sendAdditionalInputText: white,

  // Dropdown
  dropdownBg: offWhite,
  dropdownHoveredBg: white,
  dropdownBorder: alto,
  dropdownIconBorder: silver,
  dropdownOpenedIconBorder: bitter,

  // Card
  cardBackgroundColor: black,
  sendCardBg: white,
  sendCardBorder: alto,

  // Buttons
  buttonPrimaryBg: cornflowerBlue,
  buttonPrimaryDisabledBg: cornflowerBlue,
  buttonPrimaryText: white,
  buttonSecondaryBg: scorpion,
  buttonSecondaryDisabledBg: cornflowerBlue,
  buttonSecondaryBorder: scorpion,
  buttonSecondaryText: white,
  buttonSecondaryHoveredBg: silverChalice,
  buttonBorderColor: shipGray,

  // Transactions
  transactionSent: error,
  transactionReceived: success,
  transactionsDate: starDust,
  transactionsItemHovered: mineShaft,
  transactionItemBg: white,
  transactionItemHoverBg: whiteHover,
  transactionItemBorder: alto,
  transactionItemAddress: doveGray,
  transactionItemAddressHover: black,
  transactionDetailsShadow: `0px 0px 1px 0px ${black}`,
  transactionDetailsBg: white,
  transactionDetailsRowHover: whiteHover,
  transactionDetailsDivider: alto,
  transactionDetailsLabel: dustyGray,
  transactionLabelText: doveGray,
  transactionLabelTextHovered: black,

  // Status Pill
  statusPillLabel: text,
  statusPillBg: whiteHover,
  statusPillBorder: alto,

  // Sidebar
  sidebarBg: white,
  sidebarBorderRight: alto,
  sidebarLogoGradientBegin: saffron,
  sidebarLogoGradientEnd: brightSun,
  sidebarHoveredItemLabel: manatee,
  sidebarItem: silverChalice,
  sidebarItemActive: text,
  sidebarItemHovered: text,
  sidebarItemHoveredBg: offWhite,
  sidebarActiveItemLabel: manatee,
  sidebarActiveItemBorder: error,

  // QR Code
  qrCodeWrapperBg: white,
  qrCodeWrapperBorder: alto,

  // Forms
  inputBg: white,
  inputBorder: alto,
  inputBorderActive: bitter,

  // Wallet Summary
  walletSummaryBg: white,
  walletSummaryBorder: alto,
  walletSummaryUnconfirmed: shipGray,
  walletSummaryShielded: black,
  walletSummaryTransparent: black,

  // Wallet Address
  walletAddressBg: white,
  walletAddressBorder: alto,
  walletAddressInput: doveGray,
  walletAddressInputHovered: black,
  walletAddressTooltip: white,
  walletAddressTooltipBg: black,

  // Console
  consoleBg: white,
  consoleBorder: alto,

  // Settings
  settingsCardBg: white,
  settingsLearnMore: boulder,
  settingsLearnMoreHovered: black,

  // Loading
  loadingScreenBg: black,
  loadingScreenText: white,
  loadingScreenProgress: saffron,
};
