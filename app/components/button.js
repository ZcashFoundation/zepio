// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
// $FlowFixMe
import { darken } from 'polished';

const DefaultButton = styled.button`
  padding: 10px 30px;
  font-family: ${// $FlowFixMe
  props => props.theme.fontFamily};
  font-weight: ${// $FlowFixMe
  props => props.theme.fontWeight.bold};
  font-size: ${// $FlowFixMe
  props => `${props.theme.fontSize.text}em`};
  cursor: pointer;
  outline: none;
  min-width: 100px;
  border-radius: 100px;
  transition: background-color 0.1s ease-in-out;
  width: 100%;
`;

const Primary = styled(DefaultButton)`
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

const Secondary = styled(DefaultButton)`
  background-color: transparent;
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
  to?: string,
  variant?: 'primary' | 'secondary',
  disabled?: boolean,
  className?: string,
};

export const Button = ({
  onClick,
  label,
  to,
  variant,
  disabled,
  className,
}: Props) => {
  if (to && onClick) throw new Error('Should define either "to" or "onClick"');

  const component = variant === 'primary' ? (
    <Primary onClick={onClick} disabled={disabled} className={className}>
      {label}
    </Primary>
  ) : (
    <Secondary onClick={onClick} disabled={disabled} className={className}>
      {label}
    </Secondary>
  );

  return to ? <Link to={String(to)}>{component}</Link> : component;
};

Button.defaultProps = {
  to: null,
  variant: 'primary',
  onClick: null,
  disabled: false,
  className: '',
};
