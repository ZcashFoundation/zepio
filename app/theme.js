// @flow
import theme from 'styled-theming';

import { DARK } from './constants/themes';

export default {
  mode: DARK,
  fontFamily: 'Open Sans',
  colors: {
    primary: theme('mode', {
      light: '#fff',
      dark: '#000',
    }),
    secondary: theme('mode', {
      light: '#000',
      dark: '#fff',
    }),
  },
  size: {
    title: 18,
    paragraph: 12,
  },
};
