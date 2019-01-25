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
  error: string | null,
  zecPrice: number,
  addresses: string[],
  transactions: TransactionsList,
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
