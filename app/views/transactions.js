// @flow
import React, { Component, Fragment } from 'react';

import { TransactionDailyComponent } from '../components/transaction-daily';

import type { Transaction } from '../components/transaction-item';

type Props = {
  isLoading: boolean,
  error: string | null,
  transactions: { [day: string]: Transaction[] },
  zecPrice: number,
  getTransactions: () => void,
};

export class TransactionsView extends Component<Props> {
  componentDidMount() {
    // eslint-disable-next-line
    this.props.getTransactions();
  }

  render() {
    const {
      error, isLoading, transactions, zecPrice,
    } = this.props;

    if (error) {
      return error;
    }

    const days = Object.keys(transactions);

    return (
      <Fragment>
        {isLoading
          ? 'Loading'
          : days.map(day => (
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
