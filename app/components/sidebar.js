// @flow

import React, { Component } from 'react';
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
  color: ${props => (props.isActive ? props.theme.colors.sidebarItemActive : props.theme.colors.sidebarItem)};
  font-size: ${props => `${props.theme.fontSize.text}em`};
  text-decoration: none;
  font-weight: ${props => (props.isActive ? props.theme.fontWeight.bold : props.theme.fontWeight.default)};
  padding: 15px 20px;
  display: flex;
  align-items: center;
  outline: none;
  border-right: ${props => (props.isActive ? `1px solid ${props.theme.colors.sidebarItemActive}` : 'none')};

  &:hover {
    color: ${props => props.theme.colors.sidebarItemActive};

    svg {
      color: ${props => props.theme.colors.sidebarItemActive};
    }
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

type State = {
  currentHovered: string | null,
};

export class SidebarComponent extends Component<Props, State> {
  static defaultProps = {
    options: MENU_OPTIONS,
  };

  state = {
    currentHovered: null,
  };

  render() {
    const { options, location } = this.props;
    const { currentHovered } = this.state;

    return (
      <Wrapper>
        {(options || []).map((item) => {
          const isActive = location.pathname === item.route;
          return (
            <StyledLink
              onMouseEnter={() => this.setState(() => ({ currentHovered: item.route }))}
              onMouseLeave={() => this.setState(() => ({ currentHovered: null }))}
              isActive={isActive}
              key={item.route}
              to={item.route}
            >
              <Icon src={item.icon(currentHovered === item.route || isActive)} alt={`Sidebar Icon ${item.route}`} />
              {item.label}
            </StyledLink>
          );
        })}
      </Wrapper>
    );
  }
}
