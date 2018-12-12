// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';

import { WalletSummaryComponent } from '../components/wallet-summary';
import { withDaemonStatusCheck } from '../components/with-daemon-status-check';
import { TextComponent } from '../components/text';

const Title = styled(TextComponent)`
  font-size: 1.5em;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Divider = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.text};
  height: 1px;
  opacity: 0.1;
`;

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
          <Fragment>
            <Title value='Dashboard' />
            <Divider />
            <WalletSummaryComponent
              total={this.props.total}
              shielded={this.props.shielded}
              transparent={this.props.transparent}
              dollarValue={this.props.dollarValue}
              addresses={this.props.addresses}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

export const DashboardView = withDaemonStatusCheck(Dashboard);
