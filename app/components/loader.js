// @flow
import React from 'react';
import styled from 'styled-components';

import { TextComponent } from './text';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const LoaderComponent = () => (
  <Wrapper>
    <TextComponent value='Loading...' />
  </Wrapper>
);
