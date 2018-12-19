// @flow
import React from 'react';
import styled from 'styled-components';

import { TextComponent } from './text';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};
`;

export const LoadingScreen = () => (
  <Wrapper>
    <TextComponent value='Loading daemon...' />
  </Wrapper>
);
