// @flow
import electron from 'electron'; // eslint-disable-line
import React, { type ComponentType, Component } from 'react';

import store from '../../config/electron-store';

import { LoadingScreen } from './loading-screen';

import rpc from '../../services/api';

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

    requestOnTheFly: boolean = false;

    state = {
      isRunning: false,
      progress: 0,
      message: 'Zepio Starting',
    };

    componentDidMount() {
      this.runTest();
      this.timer = setInterval(this.runTest, 3000);

      electron.ipcRenderer.on(
        'zcash-daemon-status',
        (
          event: empty,
          message: {
            error: boolean,
            status: string,
          },
        ) => {
          if (message.error) {
            clearInterval(this.timer);
          }

          this.setState({
            message: message.status,
            ...(message.error ? { progress: 0, isRunning: false } : {}),
          });
        },
      );
    }

    componentWillUnmount() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }

    runTest = () => {
      const daemonPID: number = store.get('DAEMON_PROCESS_PID');

      if (this.requestOnTheFly || !daemonPID) return;

      this.requestOnTheFly = true;

      rpc
        .ping()
        .then(() => {
          this.requestOnTheFly = false;

          setTimeout(() => {
            this.setState(() => ({ isRunning: true }));
          }, 500);
          this.setState(() => ({ progress: 100 }));

          if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
          }
        })
        .catch((error) => {
          this.requestOnTheFly = false;

          const statusMessage: string = error.message === 'Something went wrong' ? 'Zepio Starting' : error.message;
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
