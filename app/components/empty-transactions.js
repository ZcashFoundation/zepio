// @flow
import React from 'react';
import styled from 'styled-components';

import { TextComponent } from './text';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
`;

export const EmptyTransactionsComponent = () => (
  <Wrapper>
    <TextComponent value='No transactions!' />
  </Wrapper>
);
