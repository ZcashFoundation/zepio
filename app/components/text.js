// @flow

/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import type { ElementProps } from 'react';

import { appTheme } from '../theme';

export type Props = {
  ...ElementProps<'p'>,
  value: string,
  isBold?: boolean,
  color?: string,
  className?: string,
  size?: string | number,
  align?: string,
  onClick?: Function,
  onDoubleClick?: Function,
};

const Text = styled.p`
  font-family: ${(props: PropsWithTheme<Props>) => props.theme.fontFamily};
  font-size: ${(props: PropsWithTheme<Props>) => String(props.size)};
  color: ${(props: PropsWithTheme<Props>) => props.color || props.theme.colors.text};
  margin: 0;
  padding: 0;
  font-weight: ${(props: PropsWithTheme<Props>) => String(props.isBold ? props.theme.fontWeight.bold : props.theme.fontWeight.default)};
  text-align: ${(props: PropsWithTheme<Props>) => props.align || 'left'};
`;

export const TextComponent = ({
  value, isBold, color, className, size,
  align, id, onClick, onDoubleClick,
}: Props) => (
  <Text
    id={id}
    className={className}
    isBold={isBold}
    color={color}
    size={`${String(size)}em`}
    align={align}
    onClick={onClick}
    onDoubleClick={onDoubleClick}
  >
    {value}
  </Text>
);

TextComponent.defaultProps = {
  className: '',
  isBold: false,
  color: appTheme.colors.text,
  size: appTheme.fontSize.regular,
  align: 'left',
  onClick: () => {},
  onDoubleClick: () => {},
};
