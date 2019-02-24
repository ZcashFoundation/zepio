// @flow

import React, { PureComponent } from 'react';
import styled, { keyframes, withTheme } from 'styled-components';

import { TextComponent } from './text';

import { DARK } from '../constants/themes';

import readyIconDark from '../assets/images/green_check_dark.png';
import readyIconLight from '../assets/images/green_check_light.png';
import syncIconDark from '../assets/images/sync_icon_dark.png';
import syncIconLight from '../assets/images/sync_icon_light.png';
import errorIconDark from '../assets/images/error_icon_dark.png';
import errorIconLight from '../assets/images/error_icon_light.png';

import type { MapDispatchToProps, MapStateToProps } from '../containers/status-pill';

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
  background: ${props => props.theme.colors.statusPillBg};
  border: 1px solid ${props => props.theme.colors.statusPillBorder}
  border-radius: 27px;
  padding: 8px 16px;
`;

const Icon = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 8px;
  animation: 2s linear infinite;

  animation-name: ${/** $FlowFixMe */
  (props: PropsWithTheme<{ animated: boolean }>) => (props.animated ? rotate : 'none')};
`;

const StatusPillLabel = styled(TextComponent)`
  color: ${props => props.theme.colors.statusPillLabel};
  font-weight: ${props => String(props.theme.fontWeight.bold)};
  text-transform: uppercase;
  font-size: 10px;
  padding-top: 1px;
  user-select: none;
`;

type Props = {
  theme: AppTheme,
} & MapStateToProps &
  MapDispatchToProps;

const MINUTE_IN_MILI = 60000;

class Component extends PureComponent<Props> {
  timer: ?IntervalID = null;

  componentDidMount() {
    const { getBlockchainStatus } = this.props;

    this.timer = setInterval(() => getBlockchainStatus(), 2000);
  }

  componentDidUpdate(prevProps: Props) {
    const { getBlockchainStatus, nodeSyncType } = this.props;
    if (prevProps.nodeSyncType === 'syncing' && nodeSyncType === 'ready') {
      // if the status is "ready", we can increase the interval to avoid useless rpc calls
      this.cleanUpdateInterval();
      this.timer = setInterval(() => getBlockchainStatus(), MINUTE_IN_MILI);
    }
  }

  componentWillUnmount() {
    this.cleanUpdateInterval();
  }

  cleanUpdateInterval = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  };

  isSyncing = () => {
    const { nodeSyncType } = this.props;
    return nodeSyncType === 'syncing';
  };

  getReadyIcon = () => {
    const { theme } = this.props;
    return theme.mode === DARK ? readyIconDark : readyIconLight;
  };

  getErrorIcon = () => {
    const { theme } = this.props;
    return theme.mode === DARK ? errorIconDark : errorIconLight;
  };

  getSyncingIcon = () => {
    const { theme } = this.props;
    return theme.mode === DARK ? syncIconDark : syncIconLight;
  };

  getIcon = () => {
    const { nodeSyncType } = this.props;

    switch (nodeSyncType) {
      case 'syncing':
        return this.getSyncingIcon();
      case 'ready':
        return this.getReadyIcon();
      case 'error':
        return this.getErrorIcon();
      default:
        return null;
    }
  };

  render() {
    const icon = this.getIcon();
    const { nodeSyncType, nodeSyncProgress } = this.props;
    const percent = nodeSyncType === 'syncing' ? `(${nodeSyncProgress.toFixed(2)}%)` : '';
    const typeText = nodeSyncType === 'ready' ? 'Synced' : nodeSyncType;

    return (
      <Wrapper id='status-pill'>
        {icon && <Icon src={icon} animated={this.isSyncing()} />}
        <StatusPillLabel value={`${typeText} ${percent}`} />
      </Wrapper>
    );
  }
}

export const StatusPill = withTheme(Component);
