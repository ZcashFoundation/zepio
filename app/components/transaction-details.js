// @flow

import React from 'react';
import styled, { withTheme } from 'styled-components';
import dateFns from 'date-fns';
import { BigNumber } from 'bignumber.js';

import { ZCASH_EXPLORER_BASE_URL } from '../constants/explorer';
import { DARK } from '../constants/themes';

import SentIconDark from '../assets/images/transaction_sent_icon_dark.svg';
import ReceivedIconDark from '../assets/images/transaction_received_icon_dark.svg';
import SentIconLight from '../assets/images/transaction_sent_icon_light.svg';
import ReceivedIconLight from '../assets/images/transaction_received_icon_light.svg';
import CloseIcon from '../assets/images/close_icon.svg';

import { TextComponent } from './text';
import { RowComponent } from './row';
import { ColumnComponent } from './column';

import { formatNumber } from '../utils/format-number';
import { openExternal } from '../utils/open-external';

const Wrapper = styled.div`
  width: 460px;
  background-color: ${props => props.theme.colors.transactionDetailsBg};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  box-shadow: ${props => props.theme.colors.transactionDetailsShadow};
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
    background: ${props => props.theme.colors.transactionDetailsRowHover};
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
  background-color: ${props => props.theme.colors.transactionDetailsDivider};
  height: 1px;
  opacity: 0.5;
`;

const Label = styled(TextComponent)`
  font-weight: ${props => String(props.theme.fontWeight.bold)};
  color: ${props => props.theme.colors.transactionDetailsLabel};
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
  address: string,
  fees: number | string,
  handleClose: () => void,
  theme: AppTheme,
};

const Component = ({
  amount,
  type,
  zecPrice,
  date,
  transactionId,
  address,
  fees,
  handleClose,
  theme,
}: Props) => {
  const isReceived = type === 'receive';
  const receivedIcon = theme.mode === DARK ? ReceivedIconDark : ReceivedIconLight;
  const sentIcon = theme.mode === DARK ? SentIconDark : SentIconLight;

  return (
    <Wrapper>
      <CloseIconWrapper>
        <CloseIconImg src={CloseIcon} onClick={handleClose} />
      </CloseIconWrapper>
      <TitleWrapper>
        <TextComponent value='Transaction Details' align='center' />
      </TitleWrapper>
      <DetailsWrapper>
        <Icon src={isReceived ? receivedIcon : sentIcon} alt='Transaction Type Icon' />
        <TextComponent
          isBold
          size={2.625}
          value={formatNumber({
            append: `${isReceived ? '+' : '-'}ZEC `,
            value: amount,
          })}
          color={
            isReceived
              ? theme.colors.transactionReceived({ theme })
              : theme.colors.transactionSent({ theme })
          }
        />
        <TextComponent
          value={formatNumber({
            append: `${isReceived ? '+' : '-'}USD `,
            value: new BigNumber(amount).times(zecPrice).toNumber(),
          })}
          size={1.5}
          color={theme.colors.transactionDetailsLabel({ theme })}
        />
      </DetailsWrapper>
      <InfoRow>
        <ColumnComponent>
          <Label value='DATE' />
          <TextComponent value={dateFns.format(new Date(date), 'MMMM D, YYYY HH:MMA')} />
        </ColumnComponent>
        <ColumnComponent>
          <TextComponent
            value='FEES'
            isBold
            color={theme.colors.transactionDetailsLabel({ theme })}
          />
          <TextComponent
            value={
              fees === 'N/A'
                ? 'N/A'
                : formatNumber({
                  value: new BigNumber(fees).toFormat(4),
                  append: 'ZEC ',
                })
            }
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
          <Label value='Address' />
          <Ellipsis value={address} />
        </ColumnComponent>
      </InfoRow>
    </Wrapper>
  );
};

export const TransactionDetailsComponent = withTheme(Component);
