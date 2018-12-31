// @flow
import styled from 'styled-components';

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.color || props.theme.colors.text};
  opacity: ${props => props.opacity || 1};
`;
