// @flow

import React from 'react';
import styled, { withTheme } from 'styled-components';
import dateFns from 'date-fns';

import { DARK } from '../constants/themes';

import SentIconDark from '../assets/images/transaction_sent_icon_dark.svg';
import ReceivedIconDark from '../assets/images/transaction_received_icon_dark.svg';
import SentIconLight from '../assets/images/transaction_sent_icon_light.svg';
import ReceivedIconLight from '../assets/images/transaction_received_icon_light.svg';
import UnconfirmedLight from '../assets/images/unconfirmed_light.svg';
import UnconfirmedDark from '../assets/images/unconfirmed_dark.svg';

import { RowComponent } from './row';
import { ColumnComponent } from './column';
import { TextComponent } from './text';
import { ModalComponent } from './modal';
import { TransactionDetailsComponent } from './transaction-details';

import { formatNumber } from '../utils/format-number';
import { getCoinName } from '../utils/get-coin-name';

const Wrapper = styled(RowComponent)`
  background-color: ${props => props.theme.colors.transactionItemBg};
  padding: 15px 17px;
  cursor: pointer;
  border: 1px solid ${props => props.theme.colors.transactionItemBorder};
  border-bottom: none;

  &:last-child {
    border-bottom: 1px solid ${props => props.theme.colors.transactionItemBorder};
  }

  &:hover {
    background-color: ${props => props.theme.colors.transactionItemHoverBg};
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

/* eslint-disable max-len */
const TransactionTypeLabel = styled(TextComponent)`
  color: ${(props: PropsWithTheme<{ isReceived: boolean }>) => (props.isReceived ? props.theme.colors.transactionReceived : props.theme.colors.transactionSent)};
  text-transform: capitalize;
`;
/* eslint-enable max-len */

const TransactionAddress = styled(TextComponent)`
  color: ${props => props.theme.colors.transactionItemAddress};

  ${String(Wrapper)}:hover & {
    color: ${props => props.theme.colors.transactionItemAddressHover};
  }
`;

const TransactionLabel = styled(TextComponent)`
  color: ${props => props.theme.colors.transactionLabelText};

  ${String(Wrapper)}:hover & {
    color: ${props => props.theme.colors.transactionLabelTextHovered};
  }
`;

const TransactionColumn = styled(ColumnComponent)`
  margin-left: 10px;
  margin-right: 80px;
  min-width: 60px;
`;

const UnconfirmedStatusWrapper = styled.div`
  right: 30px;
  position: absolute;
`;

const UnconfirmedStatus = styled.img`
  width: 20px;
  height: 20px;
  opacity: 0.6;

  ${String(Wrapper)}:hover & {
    opacity: 1;
  }
`;

const RelativeRowComponent = styled(RowComponent)`
  position: relative;
`;

export type Transaction = {
  confirmed: boolean,
  confirmations: number,
  type: 'send' | 'receive',
  date: string,
  address: string,
  amount: number,
  zecPrice: number,
  transactionId: string,
  theme: AppTheme,
};

const Component = ({
  confirmed,
  confirmations,
  type,
  date,
  address,
  amount,
  zecPrice,
  transactionId,
  theme,
}: Transaction) => {
  const coinName = getCoinName();

  const isReceived = type === 'receive';
  const transactionTime = dateFns.format(new Date(date), 'HH:mm A');
  const transactionValueInZec = formatNumber({
    value: amount,
    append: `${isReceived ? '+' : '-'}${coinName} `,
  });
  const transactionValueInUsd = formatNumber({
    value: amount * zecPrice,
    append: `${isReceived ? '+' : '-'}USD $`,
  });

  const receivedIcon = theme.mode === DARK ? ReceivedIconDark : ReceivedIconLight;
  const sentIcon = theme.mode === DARK ? SentIconDark : SentIconLight;
  const unconfirmedIcon = theme.mode === DARK ? UnconfirmedLight : UnconfirmedDark;

  // TODO: style the tooltip correctly (overlay issue)
  // const showUnconfirmed = !confirmed || confirmations < 1 || address === '(Shielded)';
  const showUnconfirmed = false;

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
            <RelativeRowComponent alignItems='center'>
              <Icon src={isReceived ? receivedIcon : sentIcon} alt='Transaction Type Icon' />
              <TransactionColumn>
                <TransactionTypeLabel isReceived={isReceived} value={type} isBold />
                <TransactionLabel value={transactionTime} isReceived={isReceived} />
              </TransactionColumn>
              {showUnconfirmed && (
                <UnconfirmedStatusWrapper>
                  <UnconfirmedStatus src={unconfirmedIcon} />
                </UnconfirmedStatusWrapper>
              )}
            </RelativeRowComponent>
            <TransactionAddress value={address} />
          </RowComponent>
          <ColumnComponent alignItems='flex-end'>
            <TextComponent
              isBold
              value={transactionValueInZec}
              color={isReceived ? theme.colors.transactionReceived : theme.colors.transactionSent}
            />
            <TransactionLabel value={transactionValueInUsd} />
          </ColumnComponent>
        </Wrapper>
      )}
    >
      {toggleVisibility => (
        <TransactionDetailsComponent
          amount={amount}
          date={date}
          address={address}
          confirmed={confirmed}
          confirmations={confirmations}
          transactionId={transactionId}
          handleClose={toggleVisibility}
          type={type}
          zecPrice={zecPrice}
        />
      )}
    </ModalComponent>
  );
};

export const TransactionItemComponent = withTheme(Component);
