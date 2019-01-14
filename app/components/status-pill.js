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
    const { verificationprogress } = this.state;
    this.getBlockchainStatus();
    this.status(verificationprogress);
  }

  status = (progress: number) => {
    if (progress === 100.0) {
      setState(() => ({ type: 'ready' , icon: readyIcon }));
    }
  }

  getBlockchainStatus = async () => {

    const [blockchainErr, blockchaininfo] = await eres(
      setTimeout(() => {rpc.getblockchaininfo()}, 500),
    );

    setState(() => ({
      verificationprogress: blockchaininfo.verificationprogress,
    }));

    if (blockchainErr) {
      setState(() => ({ type: 'error' , icon: errorIcon }));
    }
  }

  render() {
    const { type, icon, verificationprogress } = this.state;

    const showPercent = verificationprogress > 0 && verificationprogress < 100.0 ? `(${verificationprogress}%)` : '';

    return (
      <Wrapper>
        <Icon src={icon} />
        <StatusPillLabel value={`${type} ${showPercent}`} />
      </Wrapper>
    );
  }
}
