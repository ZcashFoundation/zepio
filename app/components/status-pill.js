// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import eres from 'eres';

import { TextComponent } from './text';

import rpc from '../../services/api';

import readyIcon from '../assets/images/green_check.png';
import syncIcon from '../assets/images/sync_icon.png';
import errorIcon from '../assets/images/error_icon.png';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  background-color: #000;
  border-radius: 27px;
  padding: 7px 13px;
`;

const Icon = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 8px;
`;

const StatusPillLabel = styled(TextComponent)`
  color: ${props => props.theme.colors.statusPillLabel};
  font-weight: ${props => props.theme.fontWeight.bold};
  text-transform: uppercase;
`;

type Props = {};

type State = {
  type: string,
  icon: string,
  verificationprogress: number,
};

export class StatusPill extends Component<Props, State> {
  state = {
    type: 'synching',
    icon: syncIcon,
    verificationprogress: 0,
  };

  componentDidMount() {
    this.getBlockchainStatus();
  }

  status = (progress: number) => {
    if (progress > 99.99) {
      this.setState(() => ({ type: 'ready', icon: readyIcon }));
    }
  }

  getBlockchainStatus = async () => {
    const [blockchainErr, blockchaininfo] = await eres(
      rpc.getblockchaininfo(),
    );

    const newProgress = (blockchaininfo.verificationprogress * 100);

    this.setState(() => ({
      verificationprogress: newProgress,
    }));

    if (blockchainErr) {
      this.setState(() => ({ type: 'error', icon: errorIcon }));
    }
  }

  render() {
    const { type, icon, verificationprogress } = this.state;
    const isSynching = verificationprogress > 0 && verificationprogress < 100.0;
    const showPercent = isSynching ? `(${verificationprogress.toFixed(2)}%)` : '';

    setTimeout(() => {
      this.getBlockchainStatus();
      this.status(verificationprogress);
    }, 500);
    return (
      <Wrapper>
        <Icon src={icon} />
        <StatusPillLabel value={`${type} ${showPercent}`} />
      </Wrapper>
    );
  }
}
