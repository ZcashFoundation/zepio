// @flow

import React from 'react';

import { WalletSummaryComponent } from '../components/wallet-summary';
import { withDaemonStatusCheck } from '../components/with-daemon-status-check';

type Props = {
  getSummary: () => void,
  total: number,
  shielded: number,
  transparent: number,
  error: string | null,
  isLoading: boolean,
  dollarValue: number,
  addresses: string[],
};

export class Dashboard extends React.Component<Props> {
  componentDidMount() {
    /* eslint-disable-next-line */
    this.props.getSummary();
  }

  render() {
    const {
      error, isLoading, total, shielded, transparent, dollarValue, addresses,
    } = this.props;

    if (error) {
      return error;
    }

    return (
      <div className='dashboard'>
        {isLoading ? (
          'Loading'
        ) : (
          <WalletSummaryComponent
            total={total}
            shielded={shielded}
            transparent={transparent}
            dollarValue={dollarValue}
            addresses={addresses}
          />
        )}
      </div>
    );
  }
}

export const DashboardView = withDaemonStatusCheck(Dashboard);
