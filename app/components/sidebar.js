// @flow
/* eslint-disable max-len */
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
  position: relative;
`;

const StyledLink = styled(Link)`
  color: ${props => (props.isActive ? props.theme.colors.sidebarItemActive : props.theme.colors.sidebarItem)};
  font-size: ${props => `${props.theme.fontSize.regular}em`};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeight.bold};
  background-color: ${props => (props.isActive ? `${props.theme.colors.sidebarHoveredItem}` : 'transparent')};
  letter-spacing: 0.25px;
  padding: 25px 20px;
  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  outline: none;
  border-right: ${props => (props.isActive ? `3px solid ${props.theme.colors.sidebarItemActive}` : 'none')};
  cursor: pointer;
  transition: all 0.03s ${props => props.theme.colors.transitionEase};

  &:hover {
    color: ${
  /* eslint-disable-next-line max-len */
  props => (props.isActive ? props.theme.colors.sidebarItemActive : '#ddd')
}
    background-color: ${props => props.theme.colors.sidebarHoveredItem};
  }
`;

const Icon = styled.img`
  width: 17px;
  height: 17px;
  margin-right: 13px;

  ${StyledLink}:hover & {
    filter: ${props => (props.isActive ? 'none' : 'brightness(300%)')};
  }
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
  <Wrapper id='sidebar'>
    {(options || []).map((item) => {
      const isActive = location.pathname === item.route;

      return (
        <StyledLink isActive={isActive} key={item.route} to={item.route}>
          <Icon isActive={isActive} src={item.icon(isActive)} alt={`${item.route}`} />
          {item.label}
        </StyledLink>
      );
    })}
  </Wrapper>
);

SidebarComponent.defaultProps = {
  options: MENU_OPTIONS,
};
