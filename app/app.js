// @flow

import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';

import { configureStore, history } from './redux/create';
import { Router } from './router/container';
import { appTheme as theme, GlobalStyle } from './theme';
import electronStore from '../config/electron-store';
import { DARK, LIGHT, THEME_MODE } from './constants/themes';

const store = configureStore({});

type Props = {};
type State = {
  themeMode: string,
};

const getInitialTheme = () => {
  const themeInStore = String(electronStore.get(THEME_MODE));

  if (themeInStore === DARK || themeInStore === LIGHT) return themeInStore;
  return DARK;
};

export class App extends Component<Props, State> {
  state = {
    themeMode: getInitialTheme(),
  };

  componentDidMount() {
    electronStore.set(THEME_MODE, getInitialTheme());

    electronStore.onDidChange(THEME_MODE, newValue => this.setState({ themeMode: newValue }));
  }

  render() {
    const { themeMode } = this.state;

    return (
      <ThemeProvider theme={{ ...theme, mode: themeMode }}>
        <Fragment>
          <GlobalStyle />
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <Router />
            </ConnectedRouter>
          </Provider>
        </Fragment>
      </ThemeProvider>
    );
  }
}
