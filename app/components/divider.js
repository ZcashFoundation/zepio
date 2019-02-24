// @flow

import styled from 'styled-components';

type Props = PropsWithTheme<{
  color: ?string,
  opacity: number,
  marginBottom: string,
  marginTop: string,
}>;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props: Props) => props.color || props.theme.colors.divider};
  opacity: ${(props: Props) => String(props.opacity || 1)};
  margin-bottom: ${(props: Props) => props.marginBottom || '0'};
  margin-top: ${(props: Props) => props.marginTop || '0'};
`;
