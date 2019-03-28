// @flow

import React, { type ComponentType, Component } from 'react';

import { LoadingScreen } from './loading-screen';

import rpc from '../../services/api';
import electronStore from '../../config/electron-store';

type Props = {};

type State = {
  isRunning: boolean,
  progress: number,
  message: string,
};

/* eslint-disable max-len */
export const withDaemonStatusCheck = <PassedProps: {}>(
  WrappedComponent: ComponentType<PassedProps>,
): ComponentType<$Diff<PassedProps, Props>> => class extends Component<PassedProps, State> {
    timer: ?IntervalID = null;

    state = {
      isRunning: false,
      progress: 0,
      message: 'Zepio Starting',
    };

    componentDidMount() {
      this.runTest();

      this.timer = setInterval(this.runTest, 2000);
    }

    componentWillUnmount() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }

    runTest = () => {
      if (electronStore.get('DAEMON_FETCHING_PARAMS')) {
        return this.setState({
          message:
            'Downloading network params, this may take some time depending on your connection speed',
        });
      }

      rpc
        .getinfo()
        .then((response) => {
          if (response) {
            setTimeout(() => {
              this.setState(() => ({ isRunning: true }));
            }, 500);
            this.setState(() => ({ progress: 100 }));

            if (this.timer) {
              clearInterval(this.timer);
              this.timer = null;
            }
          }
        })
        .catch((error) => {
          const statusMessage = error.message === 'Something went wrong' ? 'Zepio Starting' : error.message;

          const isRpcOff = Math.trunc(error.statusCode / 100) === 5;

          this.setState({
            message: statusMessage,
          });

          // if rpc is off (500) we have probably started the daemon process and are waiting it to boot up
          if (isRpcOff) {
            this.setState((state) => {
              const newProgress = state.progress > 70 ? state.progress + 2.5 : state.progress + 5;
              return { progress: newProgress > 95 ? 95 : newProgress, message: statusMessage };
            });
          }
        });
    };

    render() {
      const { isRunning, progress, message } = this.state;

      if (isRunning) {
        return <WrappedComponent {...this.props} {...this.state} />;
      }

      return <LoadingScreen progress={progress} message={message} />;
    }
  };
