// @flow
import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';

import SentIcon from '../assets/images/transaction_sent_icon.svg';
import ReceivedIcon from '../assets/images/transaction_received_icon.svg';
import CloseIcon from '../assets/images/close_icon.svg';

import { TextComponent } from './text';
import { RowComponent } from './row';
import { ColumnComponent } from './column';

import theme from '../theme';

import formatNumber from '../utils/formatNumber';
import truncateAddress from '../utils/truncateAddress';

const Wrapper = styled.div`
  width: 30vw;
  background-color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0px 0px 30px 0px black;
`;

const TitleWrapper = styled.div`
  margin-top: 20px;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin: 20px 0;
`;

const CloseIconWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: flex-end;
`;

const CloseIconImg = styled.img`
  width: 12.5px;
  height: 12.5px;
  margin-top: 10px;
  margin-right: 10px;
  cursor: pointer;
`;

const InfoRow = styled(RowComponent)`
  justify-content: space-between;
  align-items: center;
  width: 30vw;
  height: 80px;
  padding: 0 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Divider = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.transactionsDetailsLabel};
  height: 1px;
  opacity: 0.5;
`;

const Label = styled(TextComponent)`
  font-weight: ${props => props.theme.fontWeight.bold};
  color: ${props => props.theme.colors.transactionsDetailsLabel};
  margin-bottom: 5px;
`;

type Props = {
  amount: number,
  type: 'send' | 'receive',
  zecPrice: number,
  date: string,
  transactionId: string,
  from: string,
  to: string,
  handleClose: () => void,
};

export const TransactionDetailsComponent = ({
  amount,
  type,
  zecPrice,
  date,
  transactionId,
  from,
  to,
  handleClose,
}: Props) => {
  const isReceived = type === 'receive';
  return (
    <Wrapper>
      <CloseIconWrapper>
        <CloseIconImg src={CloseIcon} onClick={handleClose} />
      </CloseIconWrapper>
      <TitleWrapper>
        <TextComponent value='Transaction Details' align='center' />
      </TitleWrapper>
      <Icon
        src={isReceived ? ReceivedIcon : SentIcon}
        alt='Transaction Type Icon'
      />
      <TextComponent
        value={formatNumber({
          append: `${isReceived ? '+' : '-'}ZEC `,
          value: amount,
        })}
        color={
          isReceived
            ? theme.colors.transactionReceived
            : theme.colors.transactionSent
        }
        isBold
        size={2.625}
      />
      <TextComponent
        value={formatNumber({
          append: `${isReceived ? '+' : '-'}USD `,
          value: amount * zecPrice,
        })}
        size={1.5}
        color={theme.colors.transactionsDetailsLabel}
      />
      <InfoRow>
        <ColumnComponent>
          <Label value='DATE' />
          <TextComponent value={dateFns.format(date, 'MMMM D, YYYY HH:MMA')} />
        </ColumnComponent>
        <ColumnComponent>
          <TextComponent
            value='FEES'
            isBold
            color={theme.colors.transactionsDetailsLabel}
          />
          <TextComponent
            value={formatNumber({ value: amount * 0.1, append: 'ZEC ' })}
          />
        </ColumnComponent>
      </InfoRow>
      <Divider />
      <InfoRow>
        <ColumnComponent>
          <Label value='TRANSACTION ID' />
          <TextComponent value={transactionId} />
        </ColumnComponent>
      </InfoRow>
      <Divider />
      <InfoRow>
        <ColumnComponent>
          <Label value='FROM' />
          <TextComponent value={truncateAddress(from)} />
        </ColumnComponent>
      </InfoRow>
      <Divider />
      <InfoRow>
        <ColumnComponent>
          <Label value='TO' />
          <TextComponent value={truncateAddress(to)} />
        </ColumnComponent>
      </InfoRow>
    </Wrapper>
  );
};
