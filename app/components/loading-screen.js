// @flow
import React from 'react';
import styled from 'styled-components';

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

export const LoadingScreen = ({ progress }: { progress: number }) => (
  <Wrapper id='loading-screen'>
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
  </Wrapper>
);
