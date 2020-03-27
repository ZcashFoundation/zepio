// @flow

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import electron, { shell } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies

import { WalletSummaryComponent } from '../components/wallet-summary';
import { TransactionDailyComponent } from '../components/transaction-daily';
import { TextComponent } from '../components/text';
import { EmptyTransactionsComponent } from '../components/empty-transactions';
import { ConfirmDialogComponent } from '../components/confirm-dialog';
import { ColumnComponent } from '../components/column';
import { LoaderComponent } from '../components/loader';

import store from '../../config/electron-store';
import { FETCH_STATE } from '../constants/fetch-states';

import type { MapDispatchToProps, MapStateToProps } from '../containers/dashboard';

import zepioLogo from '../assets/images/zcash-icon.png';

const ModalContent = styled(ColumnComponent)`
  min-height: 400px;
  align-items: center;
  justify-content: center;

  p {
    word-break: break-word;
  }
`;

const LogoComponent = styled.img`
  max-width: 5rem;
  margin-bottom: 1.5rem;
`;

const TitleComponent = styled(TextComponent)`
  font-size: 18px;
`;

const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WelcomeText = styled(TextComponent)`
  line-height: 1.7;
  text-align: center;
  margin-top: 1rem;
`;

const HighlightText = styled(WelcomeText)`
  color: ${props => props.theme.colors.activeItem};
  background-color: ${props => props.theme.colors.walletSummaryBg};
  border: 1px solid ${props => props.theme.colors.walletSummaryBorder};
  border-radius: ${props => props.theme.boxBorderRadius};
  padding: 10px; 
  
  &:hover {
    cursor: pointer;
  }
`;

const AdditionalText = styled(TextComponent)`
  margin-top: 2rem;
  font-style: italic;
  font-size: 10px;
`;

type Props = MapDispatchToProps & MapStateToProps;

const UPDATE_INTERVAL = 10000;
const DISPLAY_WELCOME_MODAL = 'DISPLAY_WELCOME_MODAL';

export class DashboardView extends PureComponent<Props> {
  interval = null;

  componentDidMount() {
    const { getSummary, isDaemonReady } = this.props;

    getSummary();

    if (isDaemonReady) {
      this.interval = setInterval(() => getSummary(), UPDATE_INTERVAL);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  shouldShowWelcomeModal = () => store.get(DISPLAY_WELCOME_MODAL) !== false;

  openZecwallet = () => {
    shell.openExternal('https://www.zecwallet.co');
  };

  render() {
    const {
      total,
      shielded,
      transparent,
      unconfirmed,
      zecPrice,
      addresses,
      transactions,
      fetchState,
    } = this.props;

    if (fetchState === FETCH_STATE.INITIALIZING) {
      return <LoaderComponent />;
    }

    return (
      <>
        <HighlightText value='Zepio has been deprecated. Please upgrade to Zecwallet' isBold onClick={this.openZecwallet} />
        <WalletSummaryComponent
          total={total}
          shielded={shielded}
          transparent={transparent}
          unconfirmed={unconfirmed}
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
        {electron.remote.process.env.NODE_ENV !== 'test' && (
          <ConfirmDialogComponent
            title='Welcome to Zepio'
            onConfirm={(toggle) => {
              store.set(DISPLAY_WELCOME_MODAL, false);
              toggle();
            }}
            onClose={() => store.set(DISPLAY_WELCOME_MODAL, false)}
            showSingleConfirmButton
            singleConfirmButtonText='Ok. Let me in!'
            isVisible={this.shouldShowWelcomeModal()}
          >
            {() => (
              <ModalContent>
                <ContentWrapper>
                  <LogoComponent src={zepioLogo} alt='Zepio' />
                  <TitleComponent value='Hello from Zepio' isBold />
                  <WelcomeText value='Zepio is a cross-platform full-node Zcash wallet that allows users to easily send and receive ZEC. With first-class support for Sapling shielded addresses, users are able to create truly private transactions using a modern and intuitive interface.' />
                  <WelcomeText value='Zepio aims to improve the user experience for those seeking true financial privacy online.' />
                  <AdditionalText value='Zepio will need to sync the Zcash blockchain data before using all features.' />
                </ContentWrapper>
              </ModalContent>
            )}
          </ConfirmDialogComponent>
        )}
      </>
    );
  }
}
