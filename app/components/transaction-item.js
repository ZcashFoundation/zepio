// @flow
import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';

import SentIcon from '../assets/images/transaction_sent_icon.svg';
import ReceivedIcon from '../assets/images/transaction_received_icon.svg';

import { RowComponent } from './row';
import { ColumnComponent } from './column';
import { TextComponent } from './text';
import { ModalComponent } from './modal';
import { TransactionDetailsComponent } from './transaction-details';

import theme from '../theme';

import formatNumber from '../utils/format-number';
import truncateAddress from '../utils/truncate-address';

const Wrapper = styled(RowComponent)`
  background-color: ${props => props.theme.colors.cardBackgroundColor};
  padding: 15px 17px;
  cursor: pointer;

  &:hover {
    background-color: #0a0a0a;
  }
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

const TransactionAddress = styled(TextComponent)`
  color: #a7a7a7;

  ${Wrapper}:hover & {
    color: #fff;
  }
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
  transactionId: string,
};

export const TransactionItemComponent = ({
  type,
  date,
  address,
  amount,
  zecPrice,
  transactionId,
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
    <ModalComponent
      renderTrigger={toggleVisibility => (
        <Wrapper
          id={`transaction-item-${transactionId}`}
          alignItems='center'
          justifyContent='space-between'
          onClick={toggleVisibility}
        >
          <RowComponent alignItems='center'>
            <RowComponent alignItems='center'>
              <Icon
                src={isReceived ? ReceivedIcon : SentIcon}
                alt='Transaction Type Icon'
              />
              <TransactionColumn>
                <TransactionTypeLabel
                  isReceived={isReceived}
                  value={type}
                  isBold
                />
                <TransactionTime value={transactionTime} />
              </TransactionColumn>
            </RowComponent>
            <TransactionAddress value={transactionAddress} />
          </RowComponent>
          <ColumnComponent alignItems='flex-end'>
            <TextComponent
              isBold
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
      )}
    >
      {toggleVisibility => (
        <TransactionDetailsComponent
          amount={amount}
          date={date}
          from={address}
          to=''
          transactionId={transactionId}
          handleClose={toggleVisibility}
          type={type}
          zecPrice={zecPrice}
        />
      )}
    </ModalComponent>
  );
};
