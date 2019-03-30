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

const Text = styled(TextComponent)`
  margin: 0 8.5px 0;
  font-weight: 700;
  text-transform: uppercase;
  color: ${props => props.theme.colors.transactionLabelText};
  font-size: 12px;
  font-weight: 700;
`;

export const EmptyTransactionsComponent = () => (
  <Wrapper data-testid='NoTransactions'>
    <Text value='No transactions!' />
  </Wrapper>
);
