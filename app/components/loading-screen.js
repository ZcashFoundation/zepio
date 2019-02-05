// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Transition, animated } from 'react-spring';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';

import CircleProgressComponent from 'react-circle';
import { TextComponent } from './text';

import zcashLogo from '../assets/images/zcash-simple-icon.svg';

import theme from '../theme';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.cardBackgroundColor};
`;

const CircleWrapper = styled.div`
  width: 125px;
  height: 125px;
  position: relative;
  margin-bottom: 25px;
`;

const Logo = styled.img`
  z-index: 10;
  position: absolute;
  width: 50px;
  height: 50px;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
`;

type Props = {
  progress: number,
};

type State = {
  start: boolean,
  message: string,
};

const TIME_DELAY_ANIM = 100;

export class LoadingScreen extends PureComponent<Props, State> {
  state = { start: false, message: 'ZEC Wallet Starting' };

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => ({ start: true }));
    }, TIME_DELAY_ANIM);

    ipcRenderer.on('zcashd-params-download', (event, message) => {
      this.setState(() => ({ message }));
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners('zcashd-log');
  }

  render() {
    const { start, message } = this.state;
    const { progress } = this.props;

    return (
      <Wrapper>
        <Transition
          native
          items={start}
          enter={[{ height: 'auto', opacity: 1 }]}
          leave={{ height: 0, opacity: 0 }}
          from={{
            position: 'absolute',
            overflow: 'hidden',
            height: 0,
            opacity: 0,
          }}
        >
          {() => props => (
            <animated.div
              style={{
                ...props,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              id='loading-screen'
            >
              <CircleWrapper>
                <Logo src={zcashLogo} alt='Zcash logo' />
                <CircleProgressComponent
                  progress={progress}
                  s
                  responsive
                  showPercentage={false}
                  progressColor={theme.colors.activeItem}
                  bgColor={theme.colors.inactiveItem}
                />
              </CircleWrapper>
              <TextComponent value={message} />
            </animated.div>
          )}
        </Transition>
      </Wrapper>
    );
  }
}
