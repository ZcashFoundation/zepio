// @flow

// $FlowFixMe
import { normalize } from 'polished'; // eslint-disable-line
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  ${normalize()}

  * {
    box-sizing: border-box;
    user-select: none;
    outline: none;
  }
`;
