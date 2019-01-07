// @flow

import React, { PureComponent, Fragment } from 'react';

import { WalletSummaryComponent } from '../components/wallet-summary';
import { TransactionDailyComponent } from '../components/transaction-daily';
import { TextComponent } from '../components/text';
import { EmptyTransactionsComponent } from '../components/empty-transactions';

import type { Transaction } from '../components/transaction-item';

type Props = {
  getSummary: () => void,
  total: number,
  shielded: number,
  transparent: number,
  error: string | null,
  zecPrice: number,
  addresses: string[],
  transactions: { [day: string]: Transaction[] },
};

export class DashboardView extends PureComponent<Props> {
  componentDidMount() {
    /* eslint-disable-next-line */
    this.props.getSummary();
  }

  render() {
    const {
      error,
      total,
      shielded,
      transparent,
      zecPrice,
      addresses,
      transactions,
    } = this.props;

    const days = Object.keys(transactions);

    if (error) {
      return <TextComponent value={error} />;
    }

    return (
      <Fragment>
        <WalletSummaryComponent
          total={total}
          shielded={shielded}
          transparent={transparent}
          zecPrice={zecPrice}
          addresses={addresses}
        />
        {days.length === 0 ? (
          <EmptyTransactionsComponent />
        ) : (
          days.map(day => (
            <TransactionDailyComponent
              transactionsDate={day}
              transactions={transactions[day]}
              zecPrice={zecPrice}
              key={day}
            />
          ))
        )}
      </Fragment>
    );
  }
}
