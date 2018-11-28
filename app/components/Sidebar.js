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
  background: #ccc;
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
`;

type MenuItem = { route: string, label: string };

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