// @flow

import React, { PureComponent, Fragment } from 'react';

import { WalletSummaryComponent } from '../components/wallet-summary';
import { TransactionDailyComponent } from '../components/transaction-daily';
import { TextComponent } from '../components/text';
import { EmptyTransactionsComponent } from '../components/empty-transactions';

import type { TransactionsList } from '../redux/modules/transactions';

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
      </Fragment>
    );
  }
}
