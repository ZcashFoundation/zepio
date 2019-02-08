// @flow

import React, { type Node, type ElementProps } from 'react';
import styled from 'styled-components';

type FlexProps =
  | {
      alignItems: string,
      justifyContent: string,
      width: string,
    }
  | Object;
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props: FlexProps) => props.alignItems};
  justify-content: ${(props: FlexProps) => props.justifyContent};
  ${(props: FlexProps) => props.width && `width: ${props.width};`}
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
