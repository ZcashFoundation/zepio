// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MENU_OPTIONS } from '../constants/sidebar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  font-family: ${props => props.theme.fontFamily}
  background-color: ${props => props.theme.colors.sidebarBg};
  padding: 20px;
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.sidebarItem};
  font-size: 16px;
  text-decoration: none;
  font-weight: 700;
  padding: 5px 0;
`;

type MenuItem = {
  route: string,
  label: string,
};

type Props = {
  options?: MenuItem[],
};

export const SidebarComponent = ({ options }: Props) => (
  <Wrapper>
    {(options || []).map(item => (
      <StyledLink key={item.route} to={item.route}>
        {item.label}
      </StyledLink>
    ))}
  </Wrapper>
);

SidebarComponent.defaultProps = {
  options: MENU_OPTIONS,
};
