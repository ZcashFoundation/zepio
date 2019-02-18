// @flow

import theme from 'styled-theming';

import { DARK, LIGHT } from '../constants/themes';
import { typography } from './typography';
import { DARK_COLORS, LIGHT_COLORS } from './colors';

export const appTheme: AppTheme = {
  // General
  mode: DARK,

  // Typography
  ...typography,

  // Spacing
  sidebarWidth: '180px',
  headerHeight: '60px',
  layoutPaddingLeft: '35px',
  layoutPaddingRight: '35px',
  layoutContentPaddingTop: '20px',
  boxBorderRadius: '3px',

  // Misc
  transitionEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',

  // Colors
  colors: {
    primary: theme('mode', {
      [LIGHT]: LIGHT_COLORS.darkOne,
      [DARK]: DARK_COLORS.darkOne,
    }),
    secondary: theme('mode', {
      [LIGHT]: LIGHT_COLORS.darkOne,
      [DARK]: DARK_COLORS.darkOne,
    }),
    divider: theme('mode', {
      [LIGHT]: LIGHT_COLORS.divider,
      [DARK]: DARK_COLORS.divider,
    }),
    sidebarBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.sidebarBg,
      [DARK]: DARK_COLORS.sidebarBg,
    }),
    sidebarItem: theme('mode', {
      [LIGHT]: LIGHT_COLORS.sidebarItem,
      [DARK]: DARK_COLORS.sidebarItem,
    }),
    sidebarItemActive: theme('mode', {
      [LIGHT]: LIGHT_COLORS.sidebarItemActive,
      [DARK]: DARK_COLORS.sidebarItemActive,
    }),
    sidebarItemHovered: theme('mode', {
      [LIGHT]: LIGHT_COLORS.sidebarItemHovered,
      [DARK]: DARK_COLORS.sidebarItemHovered,
    }),
    sidebarHoveredItemLabel: theme('mode', {
      [LIGHT]: LIGHT_COLORS.sidebarHoveredItemLabel,
      [DARK]: DARK_COLORS.sidebarHoveredItemLabel,
    }),
    cardBackgroundColor: theme('mode', {
      [LIGHT]: LIGHT_COLORS.cardBackgroundColor,
      [DARK]: DARK_COLORS.cardBackgroundColor,
    }),
    text: theme('mode', {
      [LIGHT]: LIGHT_COLORS.text,
      [DARK]: DARK_COLORS.text,
    }),
    activeItem: theme('mode', {
      [LIGHT]: LIGHT_COLORS.activeItem,
      [DARK]: DARK_COLORS.activeItem,
    }),
    inactiveItem: theme('mode', {
      [LIGHT]: LIGHT_COLORS.brandThree,
      [DARK]: DARK_COLORS.brandThree,
    }),
    sidebarLogoGradientBegin: theme('mode', {
      [LIGHT]: LIGHT_COLORS.sidebarLogoGradientBegin,
      [DARK]: DARK_COLORS.sidebarLogoGradientBegin,
    }),
    sidebarLogoGradientEnd: theme('mode', {
      [LIGHT]: LIGHT_COLORS.sidebarLogoGradientEnd,
      [DARK]: DARK_COLORS.sidebarLogoGradientEnd,
    }),
    background: theme('mode', {
      [LIGHT]: LIGHT_COLORS.background,
      [DARK]: DARK_COLORS.background,
    }),
    transactionSent: theme('mode', {
      [LIGHT]: LIGHT_COLORS.transactionSent,
      [DARK]: DARK_COLORS.transactionSent,
    }),
    transactionReceived: theme('mode', {
      [LIGHT]: LIGHT_COLORS.transactionReceived,
      [DARK]: DARK_COLORS.transactionReceived,
    }),
    transactionsDate: theme('mode', {
      [LIGHT]: LIGHT_COLORS.transactionsDate,
      [DARK]: DARK_COLORS.transactionsDate,
    }),
    transactionsItemHovered: theme('mode', {
      [LIGHT]: LIGHT_COLORS.transactionsItemHovered,
      [DARK]: DARK_COLORS.transactionsItemHovered,
    }),
    inputBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.inputBg,
      [DARK]: DARK_COLORS.inputBg,
    }),
    selectButtonShadow: theme('mode', {
      [LIGHT]: LIGHT_COLORS.selectButtonShadow,
      [DARK]: DARK_COLORS.selectButtonShadow,
    }),
    transactionDetailsLabel: theme('mode', {
      [LIGHT]: LIGHT_COLORS.transactionDetailsLabel,
      [DARK]: DARK_COLORS.transactionDetailsLabel,
    }),
    statusPillLabel: theme('mode', {
      [LIGHT]: LIGHT_COLORS.statusPillLabel,
      [DARK]: DARK_COLORS.statusPillLabel,
    }),
    modalItemLabel: theme('mode', {
      [LIGHT]: LIGHT_COLORS.transactionsDate,
      [DARK]: DARK_COLORS.transactionsDate,
    }),
    blackTwo: theme('mode', {
      [LIGHT]: LIGHT_COLORS.blackTwo,
      [DARK]: DARK_COLORS.blackTwo,
    }),
    buttonBorderColor: theme('mode', {
      [LIGHT]: LIGHT_COLORS.buttonBorderColor,
      [DARK]: DARK_COLORS.buttonBorderColor,
    }),
    headerTitle: theme('mode', {
      [LIGHT]: LIGHT_COLORS.headerTitle,
      [DARK]: DARK_COLORS.headerTitle,
    }),
    statusPillBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.statusPillBg,
      [DARK]: DARK_COLORS.statusPillBg,
    }),
    walletSummaryBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.walletSummaryBg,
      [DARK]: DARK_COLORS.walletSummaryBg,
    }),
    walletSummaryBorder: theme('mode', {
      [LIGHT]: LIGHT_COLORS.walletSummaryBorder,
      [DARK]: DARK_COLORS.walletSummaryBorder,
    }),
    consoleBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.consoleBg,
      [DARK]: DARK_COLORS.consoleBg,
    }),
    sidebarBorderRight: theme('mode', {
      [LIGHT]: LIGHT_COLORS.sidebarBorderRight,
      [DARK]: DARK_COLORS.sidebarBorderRight,
    }),
    qrCodeWrapperBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.qrCodeWrapperBg,
      [DARK]: DARK_COLORS.qrCodeWrapperBg,
    }),
    statusPillBorder: theme('mode', {
      [LIGHT]: LIGHT_COLORS.statusPillBorder,
      [DARK]: DARK_COLORS.statusPillBorder,
    }),
    sidebarActiveItemBorder: theme('mode', {
      [LIGHT]: LIGHT_COLORS.sidebarActiveItemBorder,
      [DARK]: DARK_COLORS.sidebarActiveItemBorder,
    }),
    transactionItemBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.transactionItemBg,
      [DARK]: DARK_COLORS.transactionItemBg,
    }),
    transactionItemHoverBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.transactionItemHoverBg,
      [DARK]: DARK_COLORS.transactionItemHoverBg,
    }),
    transactionItemBorder: theme('mode', {
      [LIGHT]: LIGHT_COLORS.transactionItemBorder,
      [DARK]: DARK_COLORS.transactionItemBorder,
    }),
    transactionItemAddress: theme('mode', {
      [LIGHT]: LIGHT_COLORS.transactionItemAddress,
      [DARK]: DARK_COLORS.transactionItemAddress,
    }),
    transactionItemAddressHover: theme('mode', {
      [LIGHT]: LIGHT_COLORS.transactionItemAddressHover,
      [DARK]: DARK_COLORS.transactionItemAddressHover,
    }),
    transactionDetailsShadow: theme('mode', {
      [LIGHT]: LIGHT_COLORS.transactionDetailsShadow,
      [DARK]: DARK_COLORS.transactionDetailsShadow,
    }),
    transactionDetailsBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.transactionDetailsBg,
      [DARK]: DARK_COLORS.transactionDetailsBg,
    }),
    transactionDetailsRowHover: theme('mode', {
      [LIGHT]: LIGHT_COLORS.transactionDetailsRowHover,
      [DARK]: DARK_COLORS.transactionDetailsRowHover,
    }),
    transactionDetailsDivider: theme('mode', {
      [LIGHT]: LIGHT_COLORS.transactionDetailsDivider,
      [DARK]: DARK_COLORS.transactionDetailsDivider,
    }),
    inputBorder: theme('mode', {
      [LIGHT]: LIGHT_COLORS.inputBorder,
      [DARK]: DARK_COLORS.inputBorder,
    }),
    sidebarItemHoveredBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.sidebarItemHoveredBg,
      [DARK]: DARK_COLORS.sidebarItemHoveredBg,
    }),
    consoleBorder: theme('mode', {
      [LIGHT]: LIGHT_COLORS.consoleBorder,
      [DARK]: DARK_COLORS.consoleBorder,
    }),
    sendCardBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.sendCardBg,
      [DARK]: DARK_COLORS.sendCardBg,
    }),
    sendCardBorder: theme('mode', {
      [LIGHT]: LIGHT_COLORS.sendCardBorder,
      [DARK]: DARK_COLORS.sendCardBorder,
    }),
    walletAddressBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.walletAddressBg,
      [DARK]: DARK_COLORS.walletAddressBg,
    }),
    walletAddressBorder: theme('mode', {
      [LIGHT]: LIGHT_COLORS.walletAddressBorder,
      [DARK]: DARK_COLORS.walletAddressBorder,
    }),
    dropdownBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.dropdownBg,
      [DARK]: DARK_COLORS.dropdownBg,
    }),
    dropdownHoveredBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.dropdownHoveredBg,
      [DARK]: DARK_COLORS.dropdownHoveredBg,
    }),
    dropdownBorder: theme('mode', {
      [LIGHT]: LIGHT_COLORS.dropdownBorder,
      [DARK]: DARK_COLORS.dropdownBorder,
    }),
    settingsCardBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.settingsCardBg,
      [DARK]: DARK_COLORS.settingsCardBg,
    }),
    settingsLearnMore: theme('mode', {
      [LIGHT]: LIGHT_COLORS.settingsLearnMore,
      [DARK]: DARK_COLORS.settingsLearnMore,
    }),
    settingsLearnMoreHovered: theme('mode', {
      [LIGHT]: LIGHT_COLORS.settingsLearnMoreHovered,
      [DARK]: DARK_COLORS.settingsLearnMoreHovered,
    }),
    buttonPrimaryText: theme('mode', {
      [LIGHT]: LIGHT_COLORS.buttonPrimaryText,
      [DARK]: DARK_COLORS.buttonPrimaryText,
    }),
    buttonSecondaryText: theme('mode', {
      [LIGHT]: LIGHT_COLORS.buttonSecondaryText,
      [DARK]: DARK_COLORS.buttonSecondaryText,
    }),
    buttonPrimaryBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.buttonPrimaryBg,
      [DARK]: DARK_COLORS.buttonPrimaryBg,
    }),
    buttonSecondaryBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.buttonSecondaryBg,
      [DARK]: DARK_COLORS.buttonSecondaryBg,
    }),
    buttonPrimaryDisabledBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.buttonPrimaryDisabledBg,
      [DARK]: DARK_COLORS.buttonPrimaryDisabledBg,
    }),
    buttonSecondaryDisabledBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.buttonSecondaryDisabledBg,
      [DARK]: DARK_COLORS.buttonSecondaryDisabledBg,
    }),
    buttonSecondaryBorder: theme('mode', {
      [LIGHT]: LIGHT_COLORS.buttonSecondaryBorder,
      [DARK]: DARK_COLORS.buttonSecondaryBorder,
    }),
    buttonSecondaryHoveredBg: theme('mode', {
      [LIGHT]: LIGHT_COLORS.buttonSecondaryHoveredBg,
      [DARK]: DARK_COLORS.buttonSecondaryHoveredBg,
    }),
  },
};