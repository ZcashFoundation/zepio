// @flow
import React, { PureComponent, Fragment } from 'react';

import { TransactionDailyComponent } from '../components/transaction-daily';
import { TextComponent } from '../components/text';
import { EmptyTransactionsComponent } from '../components/empty-transactions';

import type { TransactionsList } from '../redux/modules/transactions';

type Props = {
  error: string | null,
  transactions: TransactionsList,
  zecPrice: number,
  getTransactions: () => void,
};

export class TransactionsView extends PureComponent<Props> {
  componentDidMount() {
    // eslint-disable-next-line
    this.props.getTransactions();
  }

  render() {
    const { error, transactions, zecPrice } = this.props;

    if (error) {
      return <TextComponent value={error} />;
    }

    return (
      <Fragment>
        {transactions.length === 0 ? (
          <EmptyTransactionsComponent />
        ) : (
          transactions.map(({ day, list }) => (
            <TransactionDailyComponent
              transactionsDate={day}
              transactions={list}
              zecPrice={zecPrice}
            />
          ))
        )}
      </Fragment>
    );
  }
}
