// @flow
import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';

import SentIcon from '../assets/images/transaction_sent_icon.svg';
import ReceivedIcon from '../assets/images/transaction_received_icon.svg';

import { RowComponent } from './row';
import { ColumnComponent } from './column';
import { TextComponent } from './text';

import theme from '../theme';

import formatNumber from '../utils/formatNumber';
import truncateAddress from '../utils/truncateAddress';

const Wrapper = styled(RowComponent)`
  background-color: ${props => props.theme.colors.cardBackgroundColor};
  padding: 15px 17px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const TransactionTypeLabel = styled(TextComponent)`
  color: ${props => (props.isReceived
    ? props.theme.colors.transactionReceived
    : props.theme.colors.transactionSent)};
  text-transform: capitalize;
`;

const TransactionTime = styled(TextComponent)`
  color: ${props => props.theme.colors.inactiveItem};
`;

const TransactionColumn = styled(ColumnComponent)`
  margin-left: 10px;
  margin-right: 80px;
  min-width: 60px;
`;

export type Transaction = {
  type: 'send' | 'receive',
  date: string,
  address: string,
  amount: number,
  zecPrice: number,
};

export const TransactionItemComponent = ({
  type,
  date,
  address,
  amount,
  zecPrice,
}: Transaction) => {
  const isReceived = type === 'receive';
  const transactionTime = dateFns.format(new Date(date), 'HH:mm A');
  const transactionValueInZec = formatNumber({
    value: amount,
    append: `${isReceived ? '+' : '-'}ZEC `,
  });
  const transactionValueInUsd = formatNumber({
    value: amount * zecPrice,
    append: `${isReceived ? '+' : '-'}USD $`,
  });
  const transactionAddress = truncateAddress(address);

  return (
    <Wrapper alignItems='center' justifyContent='space-between'>
      <RowComponent alignItems='center'>
        <RowComponent alignItems='center'>
          <Icon
            src={isReceived ? ReceivedIcon : SentIcon}
            alt='Transaction Type Icon'
          />
          <TransactionColumn>
            <TransactionTypeLabel isReceived={isReceived} value={type} />
            <TransactionTime value={transactionTime} />
          </TransactionColumn>
        </RowComponent>
        <TextComponent value={transactionAddress} align='left' />
      </RowComponent>
      <ColumnComponent alignItems='flex-end'>
        <TextComponent
          value={transactionValueInZec}
          color={
            isReceived
              ? theme.colors.transactionReceived
              : theme.colors.transactionSent
          }
        />
        <TextComponent
          value={transactionValueInUsd}
          color={theme.colors.inactiveItem}
        />
      </ColumnComponent>
    </Wrapper>
  );
};
