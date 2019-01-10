// @flow

import React from 'react';
import styled from 'styled-components';
import { Link, type Location } from 'react-router-dom';
import { MENU_OPTIONS } from '../constants/sidebar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.theme.sidebarWidth};
  height: ${props => `calc(100vh - ${props.theme.headerHeight})`};
  font-family: ${props => props.theme.fontFamily}
  background-color: ${props => props.theme.colors.sidebarBg}; 
  padding-top: 15px;
`;

const StyledLink = styled(Link)`
  color: ${props => (props.isActive
    ? props.theme.colors.sidebarItemActive
    : props.theme.colors.sidebarItem)};
  font-size: ${props => `${props.theme.fontSize.regular}em`};
  text-decoration: none;
  font-weight: ${props => (props.isActive
    ? props.theme.fontWeight.bold
    : props.theme.fontWeight.default)};
  padding: 0 20px;
  height: 35px;
  width: 100%;
  margin: 12.5px 0;
  display: flex;
  align-items: center;
  outline: none;
  border-right: ${props => (props.isActive
    ? `1px solid ${props.theme.colors.sidebarItemActive}`
    : 'none')};
  z-index: 100;
  cursor: pointer;

  &:hover {
    color: ${/* eslint-disable-next-line max-len */
  props => (props.isActive
    ? props.theme.colors.sidebarItemActive
    : props.theme.colors.sidebarHoveredItemLabel)};
    background-color: ${props => props.theme.colors.sidebarHoveredItem};
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 15px;
`;

type MenuItem = {
  route: string,
  label: string,
  icon: (isActive: boolean) => string,
};

type Props = {
  options?: MenuItem[],
  location: Location,
};

export const SidebarComponent = ({ options, location }: Props) => (
  <Wrapper>
    {(options || []).map((item) => {
      const isActive = location.pathname === item.route;
      return (
        <StyledLink isActive={isActive} key={item.route} to={item.route}>
          <Icon src={item.icon(isActive)} alt={`Sidebar Icon ${item.route}`} />
          {item.label}
        </StyledLink>
      );
    })}
  </Wrapper>
);

SidebarComponent.defaultProps = {
  options: MENU_OPTIONS,
};
