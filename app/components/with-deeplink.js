// @flow
import React, { type ComponentType, Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer, remote } from 'electron';
import { type RouterHistory, type Location } from 'react-router-dom';
import { searchUriInArgv } from '../../config/handle-deeplink';
import electronStore from '../../config/electron-store';

type PassedProps = {
  history: RouterHistory,
  location: Location,
  isRunning: boolean,
};

const OSX_DEEPLINK_URL_KEY = 'OSX_DEEPLINK_URL';

export const withDeepLink = (
  WrappedComponent: ComponentType<PassedProps>,
): ComponentType<$Diff<PassedProps, {}>> => class extends Component<PassedProps> {
  componentDidMount() {
    const arg = searchUriInArgv([
      ...remote.process.argv,
      electronStore.get(OSX_DEEPLINK_URL_KEY) || '',
    ]);

    if (arg) this.redirect(arg);

    remote.app.on('open-url', (event, url) => {
      this.redirect(url);
    });

    ipcRenderer.on('on-deep-link', (event: Object, message: string) => {
      this.redirect(message);
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners('on-deep-link');
  }

  redirect(message: string) {
    const { history } = this.props;

    // clean osx deeplink storage
    if (electronStore.has(OSX_DEEPLINK_URL_KEY)) {
      electronStore.delete(OSX_DEEPLINK_URL_KEY);
    }

    history.replace(`/send/${message.replace(/zcash:(\/\/)?/, '')}`);
  }

  render() {
    return <WrappedComponent {...this.props} {...this.state} />;
  }
};
