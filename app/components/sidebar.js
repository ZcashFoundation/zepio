// @flow

/* eslint-disable max-len */
import React from 'react';
import styled, { withTheme } from 'styled-components';
import type { Location, RouterHistory } from 'react-router-dom';

import { MENU_OPTIONS } from '../constants/sidebar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${props => props.theme.sidebarWidth};
  height: ${props => `calc(100vh - ${props.theme.headerHeight})`};
  font-family: ${props => props.theme.fontFamily};
  background-color: ${props => props.theme.colors.sidebarBg};
  border-right: 1px solid ${props => props.theme.colors.sidebarBorderRight};
  padding-top: 15px;
  position: relative;
`;

const InnerWrapperTop = styled.div`
  display: flex;
  flex-direction: column;
`;

const InnerWrapperBottom = styled.div`
  background-color: ${props => props.theme.colors.sidebarItemHoveredBg};
`;

const DetailsItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  justify-content: space-between;
  border-top: 2px solid ${props => props.theme.colors.sidebarBg};
`;

const DetailsItemLabel = styled.div`
  color: ${props => props.theme.colors.sidebarItem};
  font-size: 10px;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  ${DetailsItemWrapper}:hover & {
    color: ${props => props.theme.colors.sidebarItemHovered};
  }
`;

const DetailsItemValue = styled.div`
  color: ${props => props.theme.colors.sidebarItem};
  font-size: 10px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-weight: 700;

  ${DetailsItemWrapper}:hover & {
    color: ${props => props.theme.colors.sidebarItemHovered};
  }
`;

/* eslint-disable max-len */
type StyledLinkProps = PropsWithTheme<{ isActive: boolean }>;
const StyledLink = styled.a`
  color: ${(props: StyledLinkProps) => (props.isActive
    ? props.theme.colors.sidebarItemActive
    : props.theme.colors.sidebarItem
  )};
  background-color: ${(props: StyledLinkProps) => (props.isActive
    ? props.theme.colors.sidebarItemHoveredBg
    : 'transparent'
  )};
  font-size: ${(props: StyledLinkProps) => `${props.theme.fontSize.regular}em`};
  text-decoration: none;
  font-weight: ${(props: StyledLinkProps) => String(props.theme.fontWeight.bold)};
  letter-spacing: 0.25px;
  padding: 25px 20px;
  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  outline: none;
  cursor: pointer;
  outline: none;
  transition: all 0.03s ${(props: StyledLinkProps) => props.theme.transitionEase};
  border-right: ${(props: StyledLinkProps) => (props.isActive ? `3px solid ${props.theme.colors.sidebarActiveItemBorder}` : 'none')};
  border-top: 1px solid ${(props: StyledLinkProps) => (props.isActive ? props.theme.colors.sidebarBorderRight : 'transparent')};
  border-bottom: 1px solid ${(props: StyledLinkProps) => (props.isActive ? props.theme.colors.sidebarBorderRight : 'transparent')};

  &:hover {
    border-top: 1px solid ${props => props.theme.colors.sidebarBorderRight};
    border-bottom: 1px solid ${props => props.theme.colors.sidebarBorderRight};

    background-color: ${(props: StyledLinkProps) => props.theme.colors.sidebarItemHoveredBg};
    color: ${(props: StyledLinkProps) => (props.isActive ? props.theme.colors.sidebarItemActive : props.theme.colors.sidebarItemHovered)}
  }
`;

const Icon = styled.img`
  width: 17px;
  height: 17px;
  margin-right: 13px;

  opacity: ${(props: any) => (props.isActive ? '1' : '0.3')};

  ${StyledLink}:hover & {
    opacity: 1;
  }
`;

type MenuItem = {
  route: string,
  label: string,
  icon: (isActive: boolean, themeMode: string) => string,
};

type Props = {
  history: RouterHistory,
  options?: MenuItem[],
  location: Location,
  theme: AppTheme,
  zcashNetwork: string,
  embeddedDaemon: boolean,
};

export const Component = ({
  options, location, history, theme, zcashNetwork, embeddedDaemon,
}: Props) => (
  <Wrapper id='sidebar'>
    <InnerWrapperTop>
      {(options || []).map((item) => {
        const isActive = item.route === '/'
          ? location.pathname === item.route
          : location.pathname.startsWith(item.route);

        return (
          <StyledLink
            isActive={isActive}
            key={item.route}
            onClick={() => (isActive ? {} : history.push(item.route))}
          >
            <Icon
              isActive={isActive}
              src={item.icon(isActive, theme.mode)}
              alt={`${item.route}`}
            />
            {item.label}
          </StyledLink>
        );
      })}
    </InnerWrapperTop>
    <InnerWrapperBottom>
      <DetailsItemWrapper>
        <DetailsItemLabel>
          Daemon
        </DetailsItemLabel>
        <DetailsItemValue>
          {embeddedDaemon ? 'Built-in' : 'Custom'}
        </DetailsItemValue>
      </DetailsItemWrapper>
      <DetailsItemWrapper>
        <DetailsItemLabel>
          Network
        </DetailsItemLabel>
        <DetailsItemValue>
          {zcashNetwork}
        </DetailsItemValue>
      </DetailsItemWrapper>
    </InnerWrapperBottom>
  </Wrapper>
);

Component.defaultProps = {
  options: MENU_OPTIONS,
};

export const SidebarComponent = withTheme(Component);
