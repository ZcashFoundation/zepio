// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';

import { configureStore, history } from './redux/create';
import { Router } from './router/container';
import theme, { GlobalStyle } from './theme';

const store = configureStore({});

export default () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <GlobalStyle />
          <Router />
        </div>
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>
);
