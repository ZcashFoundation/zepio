// @flow

/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import type { Location, RouterHistory } from 'react-router-dom';
import { MENU_OPTIONS } from '../constants/sidebar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.theme.sidebarWidth};
  height: ${props => `calc(100vh - ${props.theme.headerHeight})`};
  font-family: ${props => props.theme.fontFamily};
  background-color: ${props => props.theme.colors.sidebarBg};
  padding-top: 15px;
  position: relative;
`;

/* eslint-disable max-len */
type StyledLinkProps = PropsWithTheme<{ isActive: boolean }>;
const StyledLink = styled.a`
  color: ${(props: StyledLinkProps) => (props.isActive ? props.theme.colors.sidebarItemActive : props.theme.colors.sidebarItem)};
  font-size: ${(props: StyledLinkProps) => `${props.theme.fontSize.regular}em`};
  text-decoration: none;
  font-weight: ${(props: StyledLinkProps) => String(props.theme.fontWeight.bold)};
  background-color: ${(props: StyledLinkProps) => (props.isActive ? `${props.theme.colors.sidebarHoveredItem}` : 'transparent')};
  letter-spacing: 0.25px;
  padding: 25px 20px;
  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  outline: none;
  border-right: ${(props: StyledLinkProps) => (props.isActive ? `3px solid ${props.theme.colors.sidebarItemActive}` : 'none')};
  cursor: pointer;
  transition: all 0.03s ${(props: StyledLinkProps) => props.theme.transitionEase};

  &:hover {
    color: ${(props: StyledLinkProps) => (props.isActive ? props.theme.colors.sidebarItemActive : '#ddd')}
    background-color: ${(props: StyledLinkProps) => props.theme.colors.sidebarHoveredItem};
  }
`;

const Icon = styled.img`
  width: 17px;
  height: 17px;
  margin-right: 13px;

  ${StyledLink}:hover & {
    filter: ${(props: StyledLinkProps) => (props.isActive ? 'none' : 'brightness(300%)')};
  }
`;

type MenuItem = {
  route: string,
  label: string,
  icon: (isActive: boolean) => string,
};

type Props = {
  history: RouterHistory,
  options?: MenuItem[],
  location: Location,
};

export const SidebarComponent = ({ options, location, history }: Props) => (
  <Wrapper id='sidebar'>
    {(options || []).map((item) => {
      const isActive = location.pathname === item.route;

      return (
        <StyledLink
          isActive={isActive}
          key={item.route}
          onClick={() => (isActive ? {} : history.push(item.route))}
        >
          <Icon isActive={isActive} src={item.icon(isActive)} Alt={`${item.route}`} />
          {item.label}
        </StyledLink>
      );
    })}
  </Wrapper>
);

SidebarComponent.defaultProps = {
  options: MENU_OPTIONS,
};
