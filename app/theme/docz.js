// @flow

import React, { Fragment, type Node } from 'react';
import { ThemeProvider } from 'styled-components';
import { appTheme } from './theme';
import { GlobalStyle } from './global';

export const DoczWrapper = ({ children }: { children: () => Node }) => (
  <ThemeProvider theme={appTheme}>
    <Fragment>
      <GlobalStyle />
      {children()}
    </Fragment>
  </ThemeProvider>
);
