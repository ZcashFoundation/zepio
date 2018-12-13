// @flow

import React from 'react';

import { WalletSummaryComponent } from '../components/wallet-summary';
import { TransactionDailyComponent } from '../components/transaction-daily';
import { withDaemonStatusCheck } from '../components/with-daemon-status-check';

import type { Transaction } from '../components/transaction-item';

type Props = {
  getSummary: () => void,
  total: number,
  shielded: number,
  transparent: number,
  error: string | null,
  isLoading: boolean,
  dollarValue: number,
  addresses: string[],
  transactions: { [day: string]: Transaction[] },
};

export class Dashboard extends React.Component<Props> {
  componentDidMount() {
    /* eslint-disable-next-line */
    this.props.getSummary();
  }

  render() {
    const {
      error, isLoading, total, shielded, transparent, dollarValue, addresses, transactions,
    } = this.props;

    const days = Object.keys(transactions);

    if (error) {
      return error;
    }

    return (
      <div className='dashboard'>
        {isLoading ? (
          'Loading'
        ) : (
          <div>
            <WalletSummaryComponent
              total={total}
              shielded={shielded}
              transparent={transparent}
              dollarValue={dollarValue}
              addresses={addresses}
            />
            {days.map(day => (
              <TransactionDailyComponent transactionsDate={day} transactions={transactions[day]} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export const DashboardView = withDaemonStatusCheck(Dashboard);
