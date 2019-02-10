import { ThemeSet } from 'styled-theming';

type Colors = {
  primary: ThemeSet,
  secondary: ThemeSet,
  sidebarBg: ThemeSet,
  sidebarItem: ThemeSet,
  sidebarItemActive: ThemeSet,
  sidebarHoveredItem: ThemeSet,
  sidebarHoveredItemLabel: ThemeSet,
  cardBackgroundColor: ThemeSet,
  text: ThemeSet,
  activeItem: ThemeSet,
  inactiveItem: ThemeSet,
  sidebarLogoGradientBegin: ThemeSet,
  sidebarLogoGradientEnd: ThemeSet,
  background: ThemeSet,
  transactionSent: ThemeSet,
  transactionReceived: ThemeSet,
  transactionsDate: ThemeSet,
  transactionsItemHovered: ThemeSet,
  inputBackground: ThemeSet,
  selectButtonShadow: ThemeSet,
  transactionsDetailsLabel: ThemeSet,
  statusPillLabel: ThemeSet,
  modalItemLabel: ThemeSet,
  blackTwo: ThemeSet,
  buttonBorderColor: ThemeSet,
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
  mode: string,
  fontFamily: string,
  fontWeight: FontWeight,
  fontSize: FontSize,
  colors: Colors,
  sidebarWidth: string,
  headerHeight: string,
  layoutPaddingLeft: string,
  layoutPaddingRight: string,
  layoutContentPaddingTop: string,
  boxBorderRadius: string,
  transitionEase: string,
};

declare type PropsWithTheme<T = {}> = {
  ...T,
  theme: AppTheme,
};
