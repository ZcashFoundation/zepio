// @flow

import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';

import { configureStore, history } from './redux/create';
import { Router } from './router/container';
import theme, { GlobalStyle } from './theme';
import electronStore from '../config/electron-store';
import { DARK } from './constants/themes';

import 'rc-tooltip/assets/bootstrap.css';

const store = configureStore({});

type Props = {};
type State = {
  themeMode: string,
};

export class App extends Component<Props, State> {
  state = {
    themeMode: electronStore.get('THEME_MODE') || DARK,
  };

  componentDidMount() {
    if (!electronStore.has('THEME_MODE')) {
      electronStore.set('THEME_MODE', DARK);
    }

    electronStore.onDidChange('THEME_MODE', newValue => this.setState({ themeMode: newValue }));
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
