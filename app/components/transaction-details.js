// @flow

import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
import { BigNumber } from 'bignumber.js';

import { ZCASH_EXPLORER_BASE_URL } from '../constants/explorer';

import SentIcon from '../assets/images/transaction_sent_icon.svg';
import ReceivedIcon from '../assets/images/transaction_received_icon.svg';
import CloseIcon from '../assets/images/close_icon.svg';

import { TextComponent } from './text';
import { RowComponent } from './row';
import { ColumnComponent } from './column';

import theme from '../theme';

import { formatNumber } from '../utils/format-number';
import { truncateAddress } from '../utils/truncate-address';
import { openExternal } from '../utils/open-external';

const Wrapper = styled.div`
  width: 460px;
  background-color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0px 0px 30px 0px black;
  position: relative;
`;

const TitleWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
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
  position: absolute;
`;

const CloseIconImg = styled.img`
  width: 16px;
  height: 16px;
  margin-top: 12px;
  margin-right: 12px;
  cursor: pointer;
`;

const InfoRow = styled(RowComponent)`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0 30px;

  &first-child {
    margin-top: 30px;
  }

  &:hover {
    background: #1d1d1d;
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const Divider = styled.div`
  width: 100%;
  background-color: #3a3a3a;
  height: 1px;
  opacity: 0.5;
`;

const Label = styled(TextComponent)`
  font-weight: ${props => String(props.theme.fontWeight.bold)};
  color: ${props => props.theme.colors.transactionsDetailsLabel};
  margin-bottom: 5px;
  letter-spacing: 0.25px;
`;

const Ellipsis = styled(TextComponent)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const TransactionId = styled.button`
  width: 100%;
  color: ${props => props.theme.colors.text};
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;

  &:hover {
    text-decoration: underline;
  }
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
      <DetailsWrapper>
        <Icon src={isReceived ? ReceivedIcon : SentIcon} alt='Transaction Type Icon' />
        <TextComponent
          isBold
          size={2.625}
          value={formatNumber({
            append: `${isReceived ? '+' : '-'}ZEC `,
            value: amount,
          })}
          color={isReceived ? theme.colors.transactionReceived : theme.colors.transactionSent}
        />
        <TextComponent
          value={formatNumber({
            append: `${isReceived ? '+' : '-'}USD `,
            value: new BigNumber(amount).times(zecPrice).toNumber(),
          })}
          size={1.5}
          color={theme.colors.transactionsDetailsLabel}
        />
      </DetailsWrapper>
      <InfoRow>
        <ColumnComponent>
          <Label value='DATE' />
          <TextComponent value={dateFns.format(new Date(date), 'MMMM D, YYYY HH:MMA')} />
        </ColumnComponent>
        <ColumnComponent>
          <TextComponent value='FEES' isBold color={theme.colors.transactionsDetailsLabel} />
          <TextComponent
            value={formatNumber({
              value: new BigNumber(amount).times(0.1).toNumber(),
              append: 'ZEC ',
            })}
          />
        </ColumnComponent>
      </InfoRow>
      <Divider />
      <InfoRow>
        <ColumnComponent width='100%'>
          <Label value='TRANSACTION ID' />
          <TransactionId onClick={() => openExternal(ZCASH_EXPLORER_BASE_URL + transactionId)}>
            <Ellipsis value={transactionId} />
          </TransactionId>
        </ColumnComponent>
      </InfoRow>
      <Divider />
      <InfoRow>
        <ColumnComponent width='100%'>
          <Label value='FROM' />
          <Ellipsis value={truncateAddress(from)} />
        </ColumnComponent>
      </InfoRow>
      <Divider />
      <InfoRow>
        <ColumnComponent width='100%'>
          <Label value='TO' />
          <Ellipsis value={truncateAddress(to)} />
        </ColumnComponent>
      </InfoRow>
    </Wrapper>
  );
};
