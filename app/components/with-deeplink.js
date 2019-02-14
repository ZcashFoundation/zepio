// @flow
import React, { type ComponentType, Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import { type RouterHistory } from 'react-router-dom';

export const withDeepLink = <PassedProps: { history: RouterHistory }>(
  WrappedComponent: ComponentType<PassedProps>,
): ComponentType<$Diff<PassedProps, {}>> => class extends Component<PassedProps> {
    timer: ?IntervalID = null;

    componentDidMount() {
      const { history } = this.props;

      ipcRenderer.on('on-deep-link', (event: Object, message: string) => {
        history.replace(`/send/${message.replace(/zcash:(\/\/)?/, '')}`);
      });
    }

    componentWillUnmount() {
      ipcRenderer.removeAllListeners('on-deep-link');
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
