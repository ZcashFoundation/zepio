// @flow

import { ThemeSet } from 'styled-theming';

type Colors = {
  // General
  text: ThemeSet,
  success: ThemeSet,
  error: ThemeSet,
  background: ThemeSet,
  divider: ThemeSet,
  activeItem: ThemeSet,
  inactiveItem: ThemeSet,
  modalItemLabel: ThemeSet,

  // Header
  headerTitle: ThemeSet,

  // Select
  selectButtonShadow: ThemeSet,

  // Send View (Additional Options Section)
  sendAdditionalOptionsBg: ThemeSet,
  sendAdditionalOptionsBorder: ThemeSet,
  sendAdditionalInputBg: ThemeSet,
  sendAdditionalInputText: ThemeSet,

  // Dropdown
  dropdownBg: ThemeSet,
  dropdownHoveredBg: ThemeSet,
  dropdownBorder: ThemeSet,
  dropdownIconBorder: ThemeSet,
  dropdownOpenedIconBorder: ThemeSet,

  // Card
  cardBackgroundColor: ThemeSet,
  sendCardBg: ThemeSet,
  sendCardBorder: ThemeSet,

  // Buttons
  buttonPrimaryBg: ThemeSet,
  buttonPrimaryText: ThemeSet,
  buttonPrimaryDisabledBg: ThemeSet,
  buttonSecondaryBg: ThemeSet,
  buttonSecondaryText: ThemeSet,
  buttonSecondaryDisabledBg: ThemeSet,
  buttonSecondaryBorder: ThemeSet,
  buttonSecondaryHoveredBg: ThemeSet,
  buttonBorderColor: ThemeSet,

  // Transactions
  transactionSent: ThemeSet,
  transactionReceived: ThemeSet,
  transactionsDate: ThemeSet,
  transactionsItemHovered: ThemeSet,
  transactionItemBg: ThemeSet,
  transactionItemHoverBg: ThemeSet,
  transactionItemAddress: ThemeSet,
  transactionItemAddressHover: ThemeSet,
  transactionDetailsShadow: ThemeSet,
  transactionDetailsBg: ThemeSet,
  transactionDetailsRowHover: ThemeSet,
  transactionDetailsDivider: ThemeSet,
  transactionDetailsLabel: ThemeSet,
  transactionLabelText: ThemeSet,
  transactionLabelTextHovered: ThemeSet,

  // Status Pill
  statusPillBg: ThemeSet,
  statusPillLabel: ThemeSet,
  statusPillBorder: ThemeSet,

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

  // QR Code
  qrCodeWrapperBg: ThemeSet,
  qrCodeWrapperBorder: ThemeSet,

  // Forms
  inputBg: ThemeSet,
  inputBorder: ThemeSet,
  inputBorderActive: ThemeSet,

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

  // Settings
  settingsCardBg: ThemeSet,
  settingsLearnMore: ThemeSet,
  settingsLearnMoreHovered: ThemeSet,

  // Loading
  loadingScreenBg: ThemeSet,
  loadingScreenText: ThemeSet,
  loadingScreenProgress: ThemeSet,
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
