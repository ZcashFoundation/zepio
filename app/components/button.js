// @flow

import React, { type ElementProps } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DefaultButton = styled.button`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 10px 30px;
  font-family: ${props => props.theme.fontFamily};
  font-weight: ${props => String(props.theme.fontWeight.bold)};
  font-size: ${props => `${props.theme.fontSize.regular}em`};
  cursor: pointer;
  outline: none;
  min-width: 100px;
  border-radius: ${props => props.theme.boxBorderRadius};
  transition: background-color 0.1s ${props => props.theme.transitionEase};
`;

const Primary = styled(DefaultButton)`
  background-color: ${props => props.theme.colors.buttonPrimaryBg};
  color: ${props => props.theme.colors.buttonPrimaryText};
  border: none;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${props => props.theme.colors.buttonPrimaryDisabledBg};
    cursor: not-allowed;
    border: none;
    opacity: 0.45;

    &:hover {
      opacity: 0.45;
    }
  }
`;

const Secondary = styled(DefaultButton)`
  background-color: ${props => props.theme.colors.buttonSecondaryBg};
  color: ${props => props.theme.colors.buttonSecondaryText};
  border: 1px solid ${props => props.theme.colors.buttonSecondaryBorder};

  &:hover {
    background-color: ${props => props.theme.colors.buttonSecondaryHoveredBg}
    border-color: ${props => props.theme.colors.buttonSecondaryHoveredBg}
  }

  &:disabled {
    background-color: ${props => props.theme.colors.buttonSecondaryDisabledBg};
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
    <Primary {...props} data-testid='PrimaryButton'>
      {icon ? <Icon src={icon} /> : null}
      {buttonLabel}
    </Primary>
  ) : (
    <Secondary {...props} data-testid='SecondaryButton'>
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
