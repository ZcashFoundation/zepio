// @flow

import React, { type ElementProps } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
// $FlowFixMe
import { darken } from 'polished';

const DefaultButton = styled.button`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 10px 30px;
  font-family: ${props => props.theme.fontFamily};
  font-weight: ${props => props.theme.fontWeight.bold};
  font-size: ${props => `${props.theme.fontSize.regular}em`};
  cursor: pointer;
  outline: none;
  min-width: 100px;
  border-radius: 100px;
  transition: background-color 0.1s ${props => props.theme.colors.transitionEase};
`;

const Primary = styled(DefaultButton)`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.secondary};
  border: none;

  &:hover {
    background-color: ${props => darken(0.1, props.theme.colors.primary(props))};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.buttonBorderColor};
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

const Secondary = styled(DefaultButton)`
  background-color: transparent;
  color: ${props => props.theme.colors.secondary};
  border: 2px solid ${props => props.theme.colors.buttonBorderColor};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }

  &:disabled {
    background-color: Transparent;
    cursor: not-allowed;
    color: ${props => props.theme.colors.buttonBorderColor};

    &:hover {
      border-color: ${props => props.theme.colors.buttonBorderColor};
    }
  }
`;

const Icon = styled.img`
  height: 12px;
  width: 12px;
  margin-right: 10px;
`;

type Props = {
  ...ElementProps<'button'>,
  label: string,
  onClick?: () => void,
  to?: ?string,
  variant?: 'primary' | 'secondary',
  disabled?: boolean,
  icon?: string | null,
  className?: string,
  isLoading?: boolean,
  id?: string,
};

export const Button = ({
  onClick,
  label,
  to,
  variant,
  disabled,
  icon,
  className,
  isLoading,
  id,
}: Props) => {
  if (to && onClick) throw new Error('Should define either "to" or "onClick"');

  const props = {
    onClick,
    disabled: disabled || isLoading,
    icon: null,
    className,
    id,
  };
  const buttonLabel = isLoading ? 'Loading...' : label;

  const component = variant === 'primary' ? (
    <Primary
      {...props}
      data-testid='PrimaryButton'
    >
      {icon ? <Icon src={icon} /> : null}
      {buttonLabel}
    </Primary>
  ) : (
    <Secondary
      {...props}
      data-testid='SecondaryButton'
    >
      {icon ? <Icon src={icon} /> : null}
      {buttonLabel}
    </Secondary>
  );

  return to ? <Link to={String(to)}>{component}</Link> : component;
};

Button.defaultProps = {
  to: '',
  icon: null,
  variant: 'primary',
  onClick: () => {},
  disabled: false,
  className: '',
  isLoading: false,
  id: '',
};
