// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MENU_OPTIONS } from '../../constants/sidebar';
import { styles } from './styles';

// TODO: Not sure this is the best approach to styling
// in a StyledComponents-powered application
const Wrapper = styled.div`
  ${styles.wrapper}
`;

type MenuItem = { route: string, label: string };

type Props = {
  options?: MenuItem[],
};

export const SidebarComponent = ({ options }: Props) => (
  <Wrapper>
    {(options || []).map(item => (
      <Link key={item.route} to={item.route}>
        {item.label}
      </Link>
    ))}
  </Wrapper>
);

SidebarComponent.defaultProps = {
  options: MENU_OPTIONS,
};
