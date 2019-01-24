// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Transition, animated } from 'react-spring';

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
}

type State = {
  start: boolean,
}

const TIME_DELAY_ANIM = 100;

export class LoadingScreen extends PureComponent<Props, State> {
  state = { start: false };

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => ({ start: true }));
    }, TIME_DELAY_ANIM);
  }

  render() {
    const { start } = this.state;
    const { progress } = this.props;

    return (
      <Wrapper>
        <Transition
          native
          items={start}
          enter={[{ height: 'auto' }]}
          leave={{ height: 0 }}
          from={{
            position: 'absolute',
            overflow: 'hidden',
            height: 0,
          }}
        >
          {() => props => (
            <animated.div style={props}>
              <CircleWrapper>
                <Logo src={zcashLogo} alt='Zcash logo' />
                <CircleProgressComponent
                  progress={progress}
                  responsive
                  showPercentage={false}
                  progressColor={theme.colors.activeItem}
                  bgColor={theme.colors.inactiveItem}
                />
              </CircleWrapper>
              <TextComponent value='ZEC Wallet Starting' />
            </animated.div>
          )}
        </Transition>
      </Wrapper>
    );
  }
}
