// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// $FlowFixMe
import { darken } from 'polished';

const defaultStyles = `
  padding: 10px 30px;
  font-family: ${
  // $FlowFixMe
  props => props.theme.fontFamily
};
  font-weight: bold;
  font-size: 0.9em;
  cursor: pointer;
  outline: none;
  min-width: 100px;
  border-radius: 100px;
  transition: background-color 0.1s ease-in-out;
`;

const Primary = styled.button`
  ${defaultStyles};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.secondary};
  border: none;

  &:hover {
    background-color: ${props => darken(0.1, props.theme.colors.primary(props))};
  }

  &:disabled {
    background-color: #3e3c42;
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

const Secondary = styled.button`
  ${defaultStyles};
  background-color: Transparent;
  color: ${props => props.theme.colors.secondary};
  border: 2px solid #3e3c42;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }

  &:disabled {
    background-color: Transparent;
    cursor: not-allowed;
    color: #3e3c42;

    &:hover {
      border-color: #3e3c42;
    }
  }
`;

type Props = {
  label: string,
  onClick?: () => void,
  isLink?: boolean,
  to?: string,
  variant?: 'primary' | 'secondary',
  disabled?: boolean,
};

export const Button = ({
  onClick, label, isLink, to, variant, disabled,
}: Props) => {
  if (isLink && !to) throw new Error('Missing "to" prop in Button Link');
  if (isLink && onClick) throw new Error("Can't bind a onClick to a Link Button");

  const component = variant === 'primary' ? (
    <Primary onClick={onClick} disabled={disabled}>
      {label}
    </Primary>
  ) : (
    <Secondary onClick={onClick} disabled={disabled}>
      {label}
    </Secondary>
  );

  return isLink ? <Link to={String(to)}>{component}</Link> : component;
};

Button.defaultProps = {
  to: null,
  isLink: false,
  variant: 'primary',
  onClick: null,
  disabled: false,
};
