// @flow

import React, { PureComponent } from 'react';
import styled, { keyframes, withTheme } from 'styled-components';
import eres from 'eres';

import { TextComponent } from './text';

import rpc from '../../services/api';
import { DARK } from '../constants/themes';

import readyIconDark from '../assets/images/green_check_dark.png';
import readyIconLight from '../assets/images/green_check_light.png';
import syncIconDark from '../assets/images/sync_icon_dark.png';
import syncIconLight from '../assets/images/sync_icon_light.png';
import errorIconDark from '../assets/images/error_icon_dark.png';
import errorIconLight from '../assets/images/error_icon_light.png';

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
};

type State = {
  type: string,
  icon: string,
  progress: number,
  isSyncing: boolean,
};

class Component extends PureComponent<Props, State> {
  timer: ?IntervalID = null;

  constructor(props: Props) {
    super(props);

    const { theme } = props;

    const syncIcon = theme.mode === DARK
      ? syncIconDark
      : syncIconLight;

    this.state = {
      type: 'syncing',
      icon: syncIcon,
      progress: 0,
      isSyncing: true,
    };
  }

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
    const { theme } = this.props;

    const readyIcon = theme.mode === DARK
      ? readyIconDark
      : readyIconLight;
    const errorIcon = theme.mode === DARK
      ? errorIconDark
      : errorIconLight;

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
      this.setState(() => ({
        type: 'error',
        icon: errorIcon,
      }));
    }
  };

  render() {
    const {
      type, icon, progress, isSyncing,
    } = this.state;
    const showPercent = isSyncing ? `(${progress.toFixed(2)}%)` : '';
    const typeText = type === 'ready' ? 'Synced' : type;

    return (
      <Wrapper id='status-pill'>
        <Icon src={icon} animated={isSyncing} />
        <StatusPillLabel value={`${typeText} ${showPercent}`} />
      </Wrapper>
    );
  }
}

export const StatusPill = withTheme(Component);
