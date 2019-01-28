// @flow
import React, { type ComponentType, Component } from 'react';
import eres from 'eres';

import rpc from './api';

type Props = {};

type State = {
  type: 'syncing' | 'ready' | 'error',
  progress: number,
};

export default function syncStatus(WrappedComponent: ComponentType<PassedProps>) {
  return class extends Component<Props, State> {
    timer: ?IntervalID = null;

    state = {
      type: 'syncing',
      progress: 0,
    };

    componentDidMount() {
      this.timer = setInterval(() => {
        this.getBlockchainStatus();
      }, 2000);
    }
  
    componentWillUnmount() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  
    getBlockchainStatus = async () => {
      const [blockchainErr, blockchaininfo] = await eres(
        rpc.getblockchaininfo(),
      );
  
      const newProgress = blockchaininfo.verificationprogress * 100;
  
      this.setState({
        progress: newProgress,
        ...(newProgress > 99.99 ? {
          type: 'ready',
        } : {}),
      });
  
      if (blockchainErr) {
        this.setState(() => ({ type: 'error' }));
      }
    }

    render() {
      const { type, progress} = this.state;

      return <WrappedComponent type={type} progress={progress} />;
    }
  };
}