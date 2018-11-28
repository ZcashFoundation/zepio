// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';

import { configureStore, history } from './store/configure';
import { Router } from './router/container';
import theme from './theme';

const store = configureStore({});

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
);
