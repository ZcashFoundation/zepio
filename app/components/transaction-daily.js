// @flow
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { TransactionItemComponent, type Transaction } from './transaction-item';
import { TextComponent } from './text';

const Wrapper = styled.div`
  margin-top: 20px;
`;

const TransactionsWrapper = styled.div`
  border-radius: 7.5px;
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
  font-size: ${props => `${props.theme.fontSize.text * 0.9}em`};
  font-weight: ${props => props.theme.fontWeight.bold};
  margin-bottom: 5px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.colors.inactiveItem};
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
  <Wrapper>
    <Day value={transactionsDate} />
    <TransactionsWrapper>
      {transactions.map(({
        date, type, address, amount,
      }, idx) => (
        <Fragment key={`${address}-${type}-${amount}-${date}`}>
          <TransactionItemComponent
            type={type}
            date={date}
            address={address || ''}
            amount={amount}
            zecPrice={zecPrice}
          />
          {idx < transactions.length - 1 && <Divider />}
        </Fragment>
      ))}
    </TransactionsWrapper>
  </Wrapper>
);
