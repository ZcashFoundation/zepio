// @flow

import React, { type Node, type ElementProps } from 'react';
import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.alignItems};
  justify-content: ${props => props.justifyContent};
  ${props => props.width && `width: ${props.width};`}
`;

type Props = {
  ...ElementProps<'div'>,
  alignItems?: string,
  justifyContent?: string,
  className?: string,
  children: Node,
  width?: string,
};

export const ColumnComponent = ({ children, ...props }: Props) => (
  <Flex {...props}>{React.Children.map(children, (ch: Node) => ch)}</Flex>
);

ColumnComponent.defaultProps = {
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  className: '',
  width: '',
};
