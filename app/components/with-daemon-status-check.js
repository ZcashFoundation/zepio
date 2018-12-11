// @flow
import React, { type ComponentType, Component } from 'react';

import rpc from '../../services/api';

type State = {
  isRunning: boolean,
};

type Props = {};

export const withDaemonStatusCheck = <PassedProps: {}>(
  WrappedComponent: ComponentType<PassedProps>,
): ComponentType<$Diff<PassedProps, Props>> => class extends Component<PassedProps, State> {
    timer: ?IntervalID = null;

    state = {
      isRunning: false,
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
      rpc.getinfo().then((response) => {
        if (response) {
          this.setState(() => ({ isRunning: true }));
          if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
          }
        }
      });
    };

    render() {
      if (this.state.isRunning) {
        return <WrappedComponent {...this.props} {...this.state} />;
      }

      return 'Daemon is starting...';
    }
  };
