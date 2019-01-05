// @flow
import React, { PureComponent, Fragment } from 'react';

import { TransactionDailyComponent } from '../components/transaction-daily';
import { TextComponent } from '../components/text';

import type { Transaction } from '../components/transaction-item';

type Props = {
  error: string | null,
  transactions: { [day: string]: Transaction[] },
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

    const days = Object.keys(transactions);

    return (
      <Fragment>
        {days.map(day => (
          <TransactionDailyComponent
            transactionsDate={day}
            transactions={transactions[day]}
            zecPrice={zecPrice}
          />
        ))}
      </Fragment>
    );
  }
}
