// @flow
import React, { type ComponentType, Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer, remote } from 'electron';
import { type RouterHistory, type Location } from 'react-router-dom';
import { searchUriInArgv } from '../../config/handle-deeplink';

type PassedProps = {
  history: RouterHistory,
  location: Location,
  isRunning: boolean,
};

export const withDeepLink = (
  WrappedComponent: ComponentType<PassedProps>,
): ComponentType<$Diff<PassedProps, {}>> => class extends Component<PassedProps> {
  componentDidMount() {
    const arg = searchUriInArgv(remote.process.argv);

    if (arg) this.redirect(arg);

    ipcRenderer.on('on-deep-link', (event: Object, message: string) => {
      this.redirect(message);
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners('on-deep-link');
  }

  redirect(message: string) {
    const { history } = this.props;

    history.replace(`/send/${message.replace(/zcash:(\/\/)?/, '')}`);
  }

  render() {
    return <WrappedComponent {...this.props} {...this.state} />;
  }
};
