// @flow

import { ThemeSet } from 'styled-theming';

type Colors = {
  primary: ThemeSet,
  secondary: ThemeSet,
  sidebarBg: ThemeSet,

  // Sidebar
  sidebarItem: ThemeSet,
  sidebarItemActive: ThemeSet,
  sidebarActiveItemBorder:  ThemeSet,
  sidebarHoveredItem: ThemeSet,
  sidebarHoveredItemLabel: ThemeSet,
  sidebarLogoGradientBegin: ThemeSet,
  sidebarLogoGradientEnd: ThemeSet,

  cardBackgroundColor: ThemeSet,
  text: ThemeSet,
  activeItem: ThemeSet,
  inactiveItem: ThemeSet,
  background: ThemeSet,

  // Transactions
  transactionSent: ThemeSet,
  transactionReceived: ThemeSet,
  transactionsDate: ThemeSet,
  transactionsItemHovered: ThemeSet,
  selectButtonShadow: ThemeSet,
  transactionsDetailsLabel: ThemeSet,
  statusPillLabel: ThemeSet,
  modalItemLabel: ThemeSet,
  blackTwo: ThemeSet,
  buttonBorderColor: ThemeSet,
  divider: ThemeSet,
  sidebarBg: ThemeSet,
  headerTitle: ThemeSet,
  statusPillBg: ThemeSet,
  walletSummaryBg: ThemeSet,
  walletSummaryBorder: ThemeSet,
  consoleBg: ThemeSet,
  sidebarBorderRight: ThemeSet,
  buttonPrimaryText: ThemeSet,
  buttonSecondaryText: ThemeSet,
  statusPillBorder: ThemeSet,
  inputBg: ThemeSet,
  qrCodeWrapperBg: ThemeSet,
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
