// @flow

import theme from 'styled-theming';

import { DARK, LIGHT } from '../constants/themes';
import { typography } from './typography';
import { DARK_COLORS, LIGHT_COLORS } from './colors';

// Building color object from theme keys
// All themes must have the same variables as DARK_COLORS
const colorKeys = Object.keys(DARK_COLORS);

const colors: Object = {};
colorKeys.forEach((key: string) => {
  colors[key] = theme('mode', {
    [LIGHT]: LIGHT_COLORS[key],
    [DARK]: DARK_COLORS[key],
  });
});

export const appTheme: AppTheme = {
  // General
  mode: DARK,

  // Typography
  ...typography,

  // Sizes & Spacing
  sidebarWidth: '180px',
  headerHeight: '60px',
  layoutPaddingLeft: '35px',
  layoutPaddingRight: '35px',
  layoutContentPaddingTop: '20px',
  boxBorderRadius: '3px',

  // Misc
  transitionEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',

  // Colors
  colors: { ...colors },
};
