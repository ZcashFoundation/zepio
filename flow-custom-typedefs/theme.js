// @flow

import { ThemeSet } from 'styled-theming';

type Colors = {
  primary: ThemeSet,
  secondary: ThemeSet,
  sidebarBg: ThemeSet,

  // Card
  cardBackgroundColor: ThemeSet,
  sendCardBg: ThemeSet,
  sendCardBorder: ThemeSet,

  text: ThemeSet,
  activeItem: ThemeSet,
  inactiveItem: ThemeSet,
  background: ThemeSet,

  selectButtonShadow: ThemeSet,

  modalItemLabel: ThemeSet,
  blackTwo: ThemeSet,
  buttonBorderColor: ThemeSet,

  // Dropdown
  dropdownBg: ThemeSet,
  dropdownHoveredBg: ThemeSet,
  dropdownBorder: ThemeSet,
  dropdownIconBorder: ThemeSet,
  dropdownOpenedIconBorder: ThemeSet,

  // Divider
  divider: ThemeSet,

  // Header
  headerTitle: ThemeSet,

  // Status Pill
  statusPillBg: ThemeSet,
  statusPillLabel: ThemeSet,
  statusPillBorder: ThemeSet,

  // Wallet Summary
  walletSummaryBg: ThemeSet,
  walletSummaryBorder: ThemeSet,

  // Wallet Address
  walletAddressBg: ThemeSet,
  walletAddressBorder: ThemeSet,
  walletAddressInput: ThemeSet,
  walletAddressInputHovered: ThemeSet,
  walletAddressTooltip: ThemeSet,
  walletAddressTooltipBg: ThemeSet,

  // Console
  consoleBg: ThemeSet,
  consoleBorder: ThemeSet,

  // Buttons
  buttonPrimaryBg: ThemeSet,
  buttonPrimaryText: ThemeSet,
  buttonPrimaryDisabledBg: ThemeSet,
  buttonSecondaryBg: ThemeSet,
  buttonSecondaryText: ThemeSet,
  buttonSecondaryDisabledBg: ThemeSet,
  buttonSecondaryBorder: ThemeSet,
  buttonSecondaryHoveredBg: ThemeSet,

  // QR Code
  qrCodeWrapperBg: ThemeSet,
  qrCodeWrapperBorder: ThemeSet,

  // Transactions
  transactionSent: ThemeSet,
  transactionReceived: ThemeSet,
  transactionsDate: ThemeSet,
  transactionsItemHovered: ThemeSet,

  // Transaction Item
  transactionItemBg: ThemeSet,
  transactionItemHoverBg: ThemeSet,
  transactionItemAddress: ThemeSet,
  transactionItemAddressHover: ThemeSet,

  // Transaction Details
  transactionDetailsShadow: ThemeSet,
  transactionDetailsBg: ThemeSet,
  transactionDetailsRowHover: ThemeSet,
  transactionDetailsDivider: ThemeSet,
  transactionDetailsLabel: ThemeSet,

  // Input
  inputBg: ThemeSet,
  inputBorder: ThemeSet,
  inputBorderActive: ThemeSet,

  // Sidebar
  sidebarBg: ThemeSet,
  sidebarItem: ThemeSet,
  sidebarItemActive: ThemeSet,
  sidebarActiveItemBorder:  ThemeSet,
  sidebarBorderRight: ThemeSet,
  sidebarItemHovered: ThemeSet,
  sidebarHoveredItemLabel: ThemeSet,
  sidebarLogoGradientBegin: ThemeSet,
  sidebarLogoGradientEnd: ThemeSet,
  sidebarItemHoveredBg: ThemeSet,

  // Settings
  settingsCardBg: ThemeSet,
  settingsLearnMore: ThemeSet,
  settingsLearnMoreHovered: ThemeSet,

  // Loading
  loadingScreenBg: ThemeSet,
  loadingScreenText: ThemeSet,
};

type FontSize = {
  large: number,
  medium: number,
  regular: number,
  small: number,
};

type FontWeight = {
  bold: number,
  default: number,
  light: number,
};

type AppTheme = {
  // General
  mode: string,

  // Typography
  fontFamily: string,
  fontWeight: FontWeight,
  fontSize: FontSize,

  // Colors
  colors: Colors,

  // Spacing
  sidebarWidth: string,
  headerHeight: string,
  layoutPaddingLeft: string,
  layoutPaddingRight: string,
  layoutContentPaddingTop: string,
  boxBorderRadius: string,

  // Misc
  transitionEase: string,
};

declare type PropsWithTheme<T = {}> = {
  ...T,
  theme: AppTheme,
};
