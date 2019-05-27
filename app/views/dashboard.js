// @flow

import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';

import { WalletSummaryComponent } from '../components/wallet-summary';
import { TransactionDailyComponent } from '../components/transaction-daily';
import { TextComponent } from '../components/text';
import { EmptyTransactionsComponent } from '../components/empty-transactions';
import { ConfirmDialogComponent } from '../components/confirm-dialog';
import { ColumnComponent } from '../components/column';

import store from '../../config/electron-store';

import type { TransactionsList } from '../redux/modules/transactions';

const ModalContent = styled(ColumnComponent)`
  min-height: 400px;
  align-items: center;
  justify-content: center;

  p {
    word-break: break-word;
  }
`;

type Props = {
  getSummary: () => void,
  total: number,
  shielded: number,
  transparent: number,
  unconfirmed: number,
  error: string | null,
  zecPrice: number,
  addresses: string[],
  isDaemonReady: boolean,
  transactions: TransactionsList,
};

const UPDATE_INTERVAL = 5000;

export class DashboardView extends PureComponent<Props> {
  interval = null;

  componentDidMount() {
    const { getSummary, isDaemonReady } = this.props;

    getSummary();

    if (isDaemonReady) {
      this.interval = setInterval(() => getSummary(), UPDATE_INTERVAL);
    }

    if (store.get('DISPLAY_WELCOME_MODAL')) {
      // SHOW MODAL
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      error,
      total,
      shielded,
      transparent,
      unconfirmed,
      zecPrice,
      addresses,
      transactions,
    } = this.props;

    if (error) {
      return <TextComponent value={error} />;
    }

    return (
      <Fragment>
        <WalletSummaryComponent
          total={total}
          shielded={shielded}
          transparent={transparent}
          unconfirmed={unconfirmed}
          zecPrice={zecPrice}
          addresses={addresses}
        />
        {transactions.length === 0 ? (
          <EmptyTransactionsComponent />
        ) : (
          transactions.map(({ day, list }) => (
            <TransactionDailyComponent
              transactionsDate={day}
              transactions={list}
              zecPrice={zecPrice}
              key={day}
            />
          ))
        )}
        <ConfirmDialogComponent
          title='Ok. Let me in!'
          onConfirm={() => store.set('DISPLAY_WELCOME_MODAL', false)}
          showSingleConfirmButton
          singleConfirmButtonText={'Ok! Let\'s go!'}
          isVisible={store.get('DISPLAY_WELCOME_MODAL')}
          renderTrigger={toggleVisibility => (
            <div onClick={toggleVisibility}>hey</div>
          )}
        >
          {() => (
            <ModalContent>
              <TextComponent value='hey there' />
            </ModalContent>
          )}
        </ConfirmDialogComponent>
      </Fragment>
    );
  }
}
