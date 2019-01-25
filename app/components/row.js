// @flow

import React from 'react';
import styled from 'styled-components';
import type { Node, ElementProps } from 'react';

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${props => props.alignItems};
  justify-content: ${props => props.justifyContent};
`;

type Props = {
  ...ElementProps<'div'>,
  alignItems?: string,
  justifyContent?: string,
  className?: string,
  children: Node,
};

export const RowComponent = ({ children, ...props }: Props) => (
  <Flex {...props}>{React.Children.map(children, ch => ch)}</Flex>
);

RowComponent.defaultProps = {
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  className: '',
};
