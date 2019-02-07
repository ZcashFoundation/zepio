type Colors = {
  primary: string,
  secondary: string,
  sidebarBg: string,
  sidebarItem: string,
  sidebarItemActive: string,
  sidebarHoveredItem: string,
  sidebarHoveredItemLabel: string,
  cardBackgroundColor: string,
  text: string,
  activeItem: string,
  inactiveItem: string,
  sidebarLogoGradientBegin: string,
  sidebarLogoGradientEnd: string,
  background: string,
  transactionSent: string,
  transactionReceived: string,
  transactionsDate: string,
  transactionsItemHovered: string,
  inputBackground: string,
  selectButtonShadow: string,
  transactionsDetailsLabel: string,
  statusPillLabel: string,
  modalItemLabel: string,
  blackTwo: string,
  buttonBorderColor: string,
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

// =(
declare type PropsWithTheme<T = {}> =
  | Object
  | ({
      theme: AppTheme,
    } & (T | Object));
