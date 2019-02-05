// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';

import { TransactionItemComponent, type Transaction } from './transaction-item';
import { TextComponent } from './text';
import { Divider } from './divider';

const Wrapper = styled.div`
  margin-top: 20px;
`;

const TransactionsWrapper = styled.div`
  border-radius: ${props => props.theme.boxBorderRadius};
  overflow: hidden;
  background-color: ${props => props.theme.colors.cardBackgroundColor};
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  margin-bottom: 20px;
`;

const Day = styled(TextComponent)`
  text-transform: uppercase;
  color: ${props => props.theme.colors.transactionsDate};
  font-size: ${props => `${props.theme.fontSize.regular * 0.9}em`};
  font-weight: ${props => props.theme.fontWeight.bold};
  margin-bottom: 5px;
`;

type Props = {
  transactionsDate: string,
  transactions: Transaction[],
  zecPrice: number,
};

export const TransactionDailyComponent = ({
  transactionsDate,
  transactions,
  zecPrice,
}: Props) => (
  <Wrapper data-testid='TransactionsDaily'>
    <Day value={transactionsDate} />
    <TransactionsWrapper>
      {transactions.map(
        ({
          date, type, address, amount, transactionId,
        }, idx) => (
          <Fragment key={`${address}-${type}-${amount}-${date}`}>
            <TransactionItemComponent
              transactionId={transactionId}
              type={type}
              date={date}
              address={address || ''}
              amount={amount}
              zecPrice={zecPrice}
            />
            {idx < transactions.length - 1 && <Divider />}
          </Fragment>
        ),
      )}
    </TransactionsWrapper>
  </Wrapper>
);
