// @flow

import React from 'react';

import { WalletSummaryComponent } from '../components/wallet-summary';

type Props = {
  getSummary: () => void,
  total: number,
  shielded: number,
  transparent: number,
  error: string | null,
  isLoading: boolean,
  dollarValue: number,
};

export class DashboardView extends React.Component<Props> {
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
          />
        )}
      </div>
    );
  }
}
