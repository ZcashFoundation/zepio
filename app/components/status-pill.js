// @flow
import React, { Component } from 'react';
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

type State = {
  type: 'syncing' | 'ready' | 'error',
  progress: number,
};

export const StatusPill = ({ type, progress }: State) => {

  const isSyncing = type === 'syncing';

  const icon = type === 'error' ? errorIcon : (isSyncing ? syncIcon : readyIcon);
  const showPercent = isSyncing ? `(${progress.toFixed(2)}%)` : '';

  return (
    <Wrapper>
      <Icon src={icon} animated={isSyncing} />
      <StatusPillLabel value={`${type} ${showPercent}`} />
    </Wrapper>
  );
};

export default StatusPill;