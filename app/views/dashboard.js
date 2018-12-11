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
    this.props.getSummary();
  }

  render() {
    if (this.props.error) {
      return this.props.error;
    }

    return (
      <div className='dashboard'>
        {this.props.isLoading ? (
          'Loading'
        ) : (
          <WalletSummaryComponent
            total={this.props.total}
            shielded={this.props.shielded}
            transparent={this.props.transparent}
            dollarValue={this.props.dollarValue}
            addresses={this.props.addresses}
          />
        )}
      </div>
    );
  }
}

export const DashboardView = withDaemonStatusCheck(Dashboard);
