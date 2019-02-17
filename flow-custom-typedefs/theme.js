// @flow

import { ThemeSet } from 'styled-theming';

type Colors = {
  primary: ThemeSet,
  secondary: ThemeSet,
  sidebarBg: ThemeSet,

  cardBackgroundColor: ThemeSet,
  text: ThemeSet,
  activeItem: ThemeSet,
  inactiveItem: ThemeSet,
  background: ThemeSet,

  selectButtonShadow: ThemeSet,

  modalItemLabel: ThemeSet,
  blackTwo: ThemeSet,
  buttonBorderColor: ThemeSet,

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

  // Console
  consoleBg: ThemeSet,
  consoleBorder: ThemeSet,

  // Buttons
  buttonPrimaryText: ThemeSet,
  buttonSecondaryText: ThemeSet,

  // QR Code
  qrCodeWrapperBg: ThemeSet,

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
