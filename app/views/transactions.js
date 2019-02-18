// @flow

import React, { PureComponent, Fragment, type Element } from 'react';
import { InfiniteLoader, AutoSizer, List } from 'react-virtualized';
import styled from 'styled-components';
import dateFns from 'date-fns';

import { TransactionItemComponent } from '../components/transaction-item';
import { TextComponent } from '../components/text';
import { EmptyTransactionsComponent } from '../components/empty-transactions';

import type { MapDispatchToProps, MapStateToProps } from '../containers/transactions';

type Props = MapDispatchToProps & MapStateToProps;

const PAGE_SIZE = 15;
const ROW_HEIGHT = 60;
const ROW_HEIGHT_WITH_HEADER = 88;

const Day = styled(TextComponent)`
  text-transform: uppercase;
  color: ${props => props.theme.colors.transactionsDate};
  font-size: ${props => `${props.theme.fontSize.regular * 0.9}em`};
  font-weight: ${props => String(props.theme.fontWeight.bold)};
  margin-top: 10px;
  margin-bottom: 5px;
`;

const RoundedTransactionWrapper = styled.div`
  overflow: hidden;

  ${props => (props.roundPosition === 'top'
    ? `
  border-top-left-radius: ${props.theme.boxBorderRadius};
  border-top-right-radius: ${props.theme.boxBorderRadius};`
    : `border-bottom-left-radius: ${props.theme.boxBorderRadius};
  border-bottom-right-radius: ${props.theme.boxBorderRadius};`)}
`;

export class TransactionsView extends PureComponent<Props> {
  componentDidMount() {
    const { getTransactions, resetTransactionsList } = this.props;
    resetTransactionsList();
    getTransactions({ count: PAGE_SIZE, offset: 0, shieldedTransactionsCount: 0 });
  }

  isRowLoaded = ({ index }: { index: number }) => {
    const { hasNextPage, transactions } = this.props;
    const transactionsSize = transactions.length;

    return !hasNextPage || index < transactionsSize;
  };

  renderTransactionWrapper = ({
    index,
    transactionDate,
    previousTransactionDate,
    nextTransactionDate,
    component,
  }: {|
    index: number,
    transactionDate: Date,
    previousTransactionDate: ?Date,
    nextTransactionDate: ?Date,
    component: Element<*>,
  |}) => {
    if (
      index === 0
      || (previousTransactionDate && !dateFns.isSameDay(transactionDate, previousTransactionDate))
    ) {
      return <RoundedTransactionWrapper roundPosition='top'>{component}</RoundedTransactionWrapper>;
    }

    if (
      nextTransactionDate
      && (nextTransactionDate && !dateFns.isSameDay(transactionDate, nextTransactionDate))
    ) {
      return (
        <RoundedTransactionWrapper roundPosition='bottom'>{component}</RoundedTransactionWrapper>
      );
    }

    return component;
  };

  renderTransactions = ({ index }: { index: number }) => {
    const { transactions, zecPrice } = this.props;

    const transaction = transactions[index];
    const previousTransaction = transactions[index - 1];
    const nextTransaction = transactions[index + 1];

    const transactionItem = this.renderTransactionWrapper({
      transactionDate: new Date(transaction.date),
      previousTransactionDate: previousTransaction ? new Date(previousTransaction.date) : null,
      nextTransactionDate: nextTransaction ? new Date(nextTransaction.date) : null,
      component: (
        <TransactionItemComponent
          address={transaction.address}
          amount={transaction.amount}
          date={transaction.date}
          transactionId={transaction.transactionId}
          type={transaction.type}
          zecPrice={zecPrice}
        />
      ),
      index,
    });
    if (
      index === 0
      || (previousTransaction
        && !dateFns.isSameDay(new Date(previousTransaction.date), new Date(transaction.date)))
    ) {
      return (
        <Fragment>
          <Day value={dateFns.format(new Date(transaction.date), 'MMM DD, YYYY')} />
          {transactionItem}
        </Fragment>
      );
    }

    return transactionItem;
  };

  renderRow = ({ index, key, style }: { index: number, key: string, style: Object }) => (
    <div key={key} style={style}>
      {this.isRowLoaded({ index }) ? this.renderTransactions({ index }) : 'Loading...'}
    </div>
  );

  getRowHeight = ({ index }: { index: number }) => {
    const { transactions } = this.props;

    const transaction = transactions[index];

    if (
      index === 0
      || !dateFns.isSameDay(new Date(transactions[index - 1].date), new Date(transaction.date))
    ) {
      return ROW_HEIGHT_WITH_HEADER;
    }

    return ROW_HEIGHT;
  };

  loadNextPage = () => {
    const { transactions, getTransactions } = this.props;

    const shieldedTransactionsCount = transactions.filter(
      transaction => transaction.address === '(Shielded)',
    ).length;

    getTransactions({ count: PAGE_SIZE, offset: transactions.length, shieldedTransactionsCount });
  };

  loadMoreRows = async () => {
    const { isLoading } = this.props;

    return isLoading ? Promise.resolve([]) : this.loadNextPage();
  };

  render() {
    const { error, transactions, hasNextPage } = this.props;

    const transactionsSize = transactions.length;
    const isRowLoaded = ({ index }) => !hasNextPage || index < transactionsSize;
    const rowCount = transactionsSize ? transactionsSize + 1 : transactionsSize;

    if (error) {
      return <TextComponent value={error} />;
    }

    return (
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={rowCount}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ width, height }) => (
              <List
                noRowsRenderer={EmptyTransactionsComponent}
                ref={registerChild}
                onRowsRendered={onRowsRendered}
                rowRenderer={this.renderRow}
                rowHeight={this.getRowHeight}
                rowCount={transactionsSize}
                width={width}
                height={height - 20}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    );
  }
}
