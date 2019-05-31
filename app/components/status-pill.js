// @flow

import React, { PureComponent } from 'react';
import styled, { keyframes, withTheme } from 'styled-components';

import { TextComponent } from './text';

import { DARK } from '../constants/themes';
import { NODE_SYNC_TYPES } from '../constants/node-sync-types';

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
  position: relative;
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

const Tooltip = styled.div`
  background: ${props => props.theme.colors.walletAddressTooltipBg};
  position: absolute;
  bottom: -35px;
  right: 5px;
  padding: 6px 10px;
  border-radius: ${props => props.theme.boxBorderRadius};
  z-index: 100;
  white-space: nowrap;

  &:after {
    bottom: 100%;
    left: 90%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-color: transparent;
    border-bottom-color: ${props => props.theme.colors.walletAddressTooltipBg};
    border-width: 5px;
    margin-left: -5px;
  }
`;

const TooltipText = styled(TextComponent)`
  color: ${props => props.theme.colors.walletAddressTooltip};
  font-size: 10px;
  font-weight: 700;
`;

type Props = {
  theme: AppTheme,
} & MapStateToProps &
  MapDispatchToProps;

type State = {
  showTooltip: boolean,
};

const INTERVAL_AFTER_READY = 60000;
const INTERVAL_BEFORE_READY = 10000;

class Component extends PureComponent<Props, State> {
  timer: ?IntervalID = null;

  requestOnTheFly: boolean = false;

  constructor(props: Props) {
    super(props);

    this.state = {
      showTooltip: false,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.updateStatus(), INTERVAL_BEFORE_READY);
  }

  componentDidUpdate(prevProps: Props) {
    const { nodeSyncType } = this.props;
    if (
      prevProps.nodeSyncType === NODE_SYNC_TYPES.SYNCING
      && nodeSyncType === NODE_SYNC_TYPES.READY
    ) {
      // if the status is "ready", we can increase the interval to avoid useless rpc calls
      this.cleanUpdateInterval();
      this.timer = setInterval(() => this.updateStatus(), INTERVAL_AFTER_READY);
    }
  }

  componentWillUnmount() {
    this.cleanUpdateInterval();
  }

  updateStatus = () => {
    if (this.requestOnTheFly) return;

    this.requestOnTheFly = true;

    const { getBlockchainStatus } = this.props;

    getBlockchainStatus()
      .then(() => {
        this.requestOnTheFly = false;
      })
      .catch(() => {
        this.requestOnTheFly = false;
      });
  };

  cleanUpdateInterval = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  };

  isSyncing = () => {
    const { nodeSyncType } = this.props;
    return nodeSyncType === NODE_SYNC_TYPES.SYNCING;
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
      case NODE_SYNC_TYPES.SYNCING:
        return this.getSyncingIcon();
      case NODE_SYNC_TYPES.READY:
        return this.getReadyIcon();
      default:
        return this.getErrorIcon();
    }
  };

  getStatusText = () => {
    const { nodeSyncType } = this.props;

    switch (nodeSyncType) {
      case NODE_SYNC_TYPES.SYNCING:
        return "Syncing blockchain data. You may not send funds or see latest transactions until it's synced.";
      case NODE_SYNC_TYPES.READY:
        return 'Your node is synced.';
      default:
        return 'There was an error. Try restarting Zepio.';
    }
  };

  getLabel = () => {
    const { nodeSyncType } = this.props;

    switch (nodeSyncType) {
      case NODE_SYNC_TYPES.SYNCING:
        return 'syncing';
      case NODE_SYNC_TYPES.READY:
        return 'ready';
      default:
        return 'error';
    }
  };

  render() {
    const icon = this.getIcon();
    const { nodeSyncType, nodeSyncProgress } = this.props;
    const { showTooltip } = this.state;
    const percent = nodeSyncType && nodeSyncType === NODE_SYNC_TYPES.SYNCING
      ? `(${nodeSyncProgress.toFixed(2)}%)`
      : '';

    return (
      // eslint-disable-next-line
      <Wrapper
        onMouseOver={() => this.setState({ showTooltip: true })}
        onMouseOut={() => this.setState({ showTooltip: false })}
        id='status-pill'
      >
        {showTooltip && (
          <Tooltip>
            <TooltipText value={this.getStatusText()} />
          </Tooltip>
        )}
        {icon && <Icon src={icon} animated={this.isSyncing()} />}
        <StatusPillLabel value={`${this.getLabel()} ${percent}`} />
      </Wrapper>
    );
  }
}

export const StatusPill = withTheme(Component);
