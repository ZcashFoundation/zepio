// @flow

import React, { type Element } from 'react';
import styled from 'styled-components';
import { Link, type Location } from 'react-router-dom';
import { MENU_OPTIONS } from '../constants/sidebar';
import { ZCashLogo } from './zcash-logo';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100vh;
  font-family: ${props => props.theme.fontFamily}
  background-color: ${props => props.theme.colors.sidebarBg};
`;

const LogoWrapper = styled.div`
  height: 60px;
  width: 200px;
  margin-bottom: 20px;
  background-image: linear-gradient(
    to right,
    ${props => props.theme.colors.sidebarLogoGradientBegin},
    ${props => props.theme.colors.sidebarLogoGradientEnd}
  );
`;

const StyledLink = styled(Link)`
  color: ${props => (props.isActive ? props.theme.colors.sidebarItemActive : props.theme.colors.sidebarItem)};
  font-size: 0.9em;
  text-decoration: none;
  font-weight: ${props => (props.isActive ? 700 : 400)};
  padding: 15px 20px;
  display: flex;
  align-items: center;
  outline: none;

  &:hover {
    color: ${props => props.theme.colors.sidebarItemActive};
  }
`;

type MenuItem = {
  route: string,
  label: string,
  icon: Element<*>,
};

type Props = {
  options?: MenuItem[],
  location: Location,
};

export const SidebarComponent = ({ options, location }: Props) => (
  <Wrapper>
    <LogoWrapper>
      <ZCashLogo />
    </LogoWrapper>
    {(options || []).map(item => (
      <StyledLink isActive={location.pathname === item.route} key={item.route} to={item.route}>
        {React.cloneElement(item.icon, {
          style: { marginRight: '15px' },
          size: 20,
        })}
        {item.label}
      </StyledLink>
    ))}
  </Wrapper>
);

SidebarComponent.defaultProps = {
  options: MENU_OPTIONS,
};
