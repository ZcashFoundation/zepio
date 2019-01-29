//  @flow
import styled from 'styled-components';

import { TextComponent } from './text';

export const InputLabelComponent = styled(TextComponent)`
  margin: ${props => props.marginTop || '20px'} 0 8.5px 0;
  font-weight: ${props => props.theme.fontWeight.bold};
`;
