// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';

import { TextComponent } from './text';

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

type Props = {
  type: 'syncing' | 'ready' | 'error',
  progress: number,
};

type State = {
  withError: boolean,
};

export class StatusPill extends React.PureComponent<Props, State> {
  state = {
    withError: false,
  };

  componentDidMount() {
    const { type } = this.props;
    if (type === 'error') {
      this.setState(() => ({ withError: false }));
    }
  }

  render() {
    const { type, progress } = this.props;
    const { withError } = this.state;

    const isSyncing = type === 'syncing';

    const icon = isSyncing ? syncIcon : readyIcon;
    const showPercent = isSyncing ? `(${progress.toFixed(2)}%)` : '';

    return (
      <Wrapper>
        <Icon src={withError ? errorIcon : icon} animated={isSyncing} />
        <StatusPillLabel value={`${type} ${showPercent}`} />
      </Wrapper>
    );
  }
}
