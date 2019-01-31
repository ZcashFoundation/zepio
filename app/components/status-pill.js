// @flow
import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import eres from 'eres';

import { TextComponent } from './text';

import rpc from '../../services/api';

import readyIcon from '../assets/images/green_check.png';
import syncIcon from '../assets/images/sync_icon.png';
import errorIcon from '../assets/images/error_icon.png';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  background-color: #000;
  border-radius: 27px;
  padding: 8px 16px;
`;

const Icon = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 8px;
  animation: 2s linear infinite;
  animation-name: ${props => (props.animated ? rotate : 'none')};
`;

const StatusPillLabel = styled(TextComponent)`
  color: ${props => props.theme.colors.statusPillLabel};
  font-weight: ${props => props.theme.fontWeight.bold};
  text-transform: uppercase;
  font-size: 10px;
  padding-top: 1px;
  user-select: none;
`;

type Props = {};

type State = {
  type: string,
  icon: string,
  progress: number,
  isSyncing: boolean,
};

export class StatusPill extends Component<Props, State> {
  timer: ?IntervalID = null;

  state = {
    type: 'syncing',
    icon: syncIcon,
    progress: 0,
    isSyncing: true,
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
    const [blockchainErr, blockchaininfo] = await eres(rpc.getblockchaininfo());

    if (blockchainErr || !blockchaininfo) return;

    const newProgress = blockchaininfo.verificationprogress * 100;

    this.setState({
      progress: newProgress,
      ...(newProgress > 99.99
        ? {
          type: 'ready',
          icon: readyIcon,
          isSyncing: false,
        }
        : {}),
    });

    if (blockchainErr) {
      this.setState(() => ({ type: 'error', icon: errorIcon }));
    }
  };

  render() {
    const {
      type, icon, progress, isSyncing,
    } = this.state;
    const showPercent = isSyncing ? `(${progress.toFixed(2)}%)` : '';

    return (
      <Wrapper id='status-pill'>
        <Icon src={icon} animated={isSyncing} />
        <StatusPillLabel value={`${type} ${showPercent}`} />
      </Wrapper>
    );
  }
}
