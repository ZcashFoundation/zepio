// @flow

import React from 'react';
import styled from 'styled-components';

import { ZcashLogo } from './zcash-logo';
import { TextComponent } from './text';
import { Divider } from './divider';
import { RowComponent } from './row';
import { StatusPill } from './status-pill';

import { withSyncStatus } from '../../services/sync-status';

const Wrapper = styled.div`
  height: ${props => props.theme.headerHeight};
  width: 100vw;
  display: flex;
  flex-direction: row;
  background-color: ${props => props.theme.colors.background};
`;

const LogoWrapper = styled.div`
  height: ${props => props.theme.headerHeight};
  width: ${props => props.theme.sidebarWidth};
  background-image: linear-gradient(
    to right,
    ${props => props.theme.colors.sidebarLogoGradientBegin},
    ${props => props.theme.colors.sidebarLogoGradientEnd}
  );
  margin-bottom: 20px;
`;

const TitleWrapper = styled.div`
  width: ${props => `calc(100% - ${props.theme.sidebarWidth})`};
  height: ${props => props.theme.headerHeight};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 10px;
  padding-left: ${props => props.theme.layoutPaddingLeft};
  padding-right: ${props => props.theme.layoutPaddingRight};
`;

const TitleRow = styled(RowComponent)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled(TextComponent)`
  font-size: ${props => `${props.theme.fontSize.large}em`};
  margin-top: 10px;
  margin-bottom: 10px;
  text-transform: capitalize;
  letter-spacing: 0.25px;
  font-weight: ${props => props.theme.fontWeight.bold};
`;

type Props = {
  title: string,
};

const Status = withSyncStatus(StatusPill);

export const HeaderComponent = ({ title }: Props) => (
  <Wrapper id='header'>
    <LogoWrapper>
      <ZcashLogo />
    </LogoWrapper>
    <TitleWrapper>
      <TitleRow
        alignItems='center'
        justifyContent='space-around'
      >
        <Title value={title} />
        <Status
          type='syncing'
          progress={0}
        />
      </TitleRow>
      <Divider opacity={0.1} />
    </TitleWrapper>
  </Wrapper>
);
