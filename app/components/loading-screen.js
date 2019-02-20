// @flow

import React, { PureComponent } from 'react';
import styled, { withTheme } from 'styled-components';
import { Transition, animated } from 'react-spring';

import CircleProgressComponent from 'react-circle';
import { TextComponent } from './text';

import zcashLogo from '../assets/images/zcash-simple-icon.svg';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.loadingScreenBg};
`;

const LoadingCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #000000;
  padding: 60px;
  min-width: 300px;
  min-height: 200px;
  border-radius: 3px;
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

const LoadingText = styled(TextComponent)`
  color: ${props => props.theme.colors.loadingScreenText};
`;

type Props = {
  progress: number,
  theme: AppTheme,
  message: string,
};

type State = {
  start: boolean,
};

const TIME_DELAY_ANIM = 100;

class Component extends PureComponent<Props, State> {
  state = { start: false };

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => ({ start: true }));
    }, TIME_DELAY_ANIM);
  }

  render() {
    const { start } = this.state;
    const { progress, message, theme } = this.props;

    return (
      <Wrapper data-testid='LoadingScreen'>
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
          {() => (props: Object) => (
            <animated.div
              id='loading-screen'
              style={{
                ...props,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LoadingCard>
                <CircleWrapper>
                  <Logo src={zcashLogo} alt='Zcash Logo' />
                  <CircleProgressComponent
                    progress={progress}
                    responsive
                    showPercentage={false}
                    progressColor={theme.colors.activeItem(this.props)}
                    bgColor={theme.colors.inactiveItem(this.props)}
                  />
                </CircleWrapper>
                <LoadingText value={message} />
              </LoadingCard>
            </animated.div>
          )}
        </Transition>
      </Wrapper>
    );
  }
}

export const LoadingScreen = withTheme(Component);
