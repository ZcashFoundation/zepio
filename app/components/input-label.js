//  @flow

import styled from 'styled-components';

import { TextComponent } from './text';

type Props = PropsWithTheme<{
  marginTop: string,
}>;

export const InputLabelComponent = styled(TextComponent)`
  margin: ${(props: Props) => props.marginTop || '20px'} 0 8.5px 0;
  font-weight: ${(props: Props) => String(props.theme.fontWeight.bold)};
`;
