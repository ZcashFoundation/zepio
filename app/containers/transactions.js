// @flow

import eres from 'eres';
import { connect } from 'react-redux';
import { BigNumber } from 'bignumber.js';

import { TransactionsView } from '../views/transactions';
import {
  loadTransactions,
  loadTransactionsSuccess,
  loadTransactionsError,
  resetTransactionsList,
} from '../redux/modules/transactions';
import rpc from '../../services/api';
import { listShieldedTransactions } from '../../services/shielded-transactions';
import store from '../../config/electron-store';

import { sortByDescend } from '../utils/sort-by-descend';

import type { AppState } from '../types/app-state';
import type { Dispatch } from '../types/redux';
import type { Transaction } from '../components/transaction-item';

const mapStateToProps = ({ transactions }: AppState) => ({
  transactions: transactions.list,
  isLoading: transactions.isLoading,
  error: transactions.error,
  zecPrice: transactions.zecPrice,
  hasNextPage: transactions.hasNextPage,
});

export type MapStateToProps = {
  transactions: Transaction[],
  isLoading: boolean,
  error: string | null,
  zecPrice: number,
  hasNextPage: boolean,
};

export type MapDispatchToProps = {|
  getTransactions: ({
    offset: number,
    count: number,
    shieldedTransactionsCount: number,
  }) => Promise<void>,
  resetTransactionsList: () => void,
|};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  resetTransactionsList: () => dispatch(resetTransactionsList()),
  getTransactions: async ({ offset, count, shieldedTransactionsCount }) => {
    dispatch(loadTransactions());

    const [transactionsErr, transactions = []] = await eres(
      rpc.listtransactions('', count, offset),
    );

    if (transactionsErr) {
      return dispatch(loadTransactionsError({ error: transactionsErr.message }));
    }

    const formattedTransactions = sortByDescend('date')(
      [
        ...transactions,
        ...listShieldedTransactions({ count, offset: shieldedTransactionsCount }),
      ].map(transaction => ({
        transactionId: transaction.txid,
        type: transaction.category,
        date: new Date(transaction.time * 1000).toISOString(),
        address: transaction.address || '(Shielded)',
        amount: new BigNumber(transaction.amount).absoluteValue().toNumber(),
        fees: transaction.fee ? new BigNumber(transaction.fee).abs().toFormat(4) : 'N/A',
      })),
    );

    dispatch(
      loadTransactionsSuccess({
        list: formattedTransactions,
        zecPrice: new BigNumber(store.get('ZEC_DOLLAR_PRICE')).toNumber(),
        hasNextPage: Boolean(formattedTransactions.length),
      }),
    );
  },
});

// $FlowFixMe
export const TransactionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionsView);
