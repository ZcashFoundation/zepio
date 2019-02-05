// @flow

import eres from 'eres';
import { connect } from 'react-redux';
import flow from 'lodash.flow';
import groupBy from 'lodash.groupby';
import dateFns from 'date-fns';
import { BigNumber } from 'bignumber.js';

import { TransactionsView } from '../views/transactions';
import {
  loadTransactions,
  loadTransactionsSuccess,
  loadTransactionsError,
} from '../redux/modules/transactions';
import rpc from '../../services/api';
import store from '../../config/electron-store';

import sortBy from '../utils/sort-by';

import type { AppState } from '../types/app-state';
import type { Dispatch } from '../types/redux';

const mapStateToProps = ({ transactions }: AppState) => ({
  transactions: transactions.list,
  isLoading: transactions.isLoading,
  error: transactions.error,
  zecPrice: transactions.zecPrice,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getTransactions: async () => {
    dispatch(loadTransactions());

    const [transactionsErr, transactions = []] = await eres(rpc.listtransactions());

    if (transactionsErr) {
      return dispatch(loadTransactionsError({ error: transactionsErr.message }));
    }

    const formattedTransactions = flow([
      arr => arr.map(transaction => ({
        transactionId: transaction.txid,
        type: transaction.category,
        date: new Date(transaction.time * 1000).toISOString(),
        address: transaction.address,
        amount: new BigNumber(transaction.amount).absoluteValue().toNumber(),
      })),
      arr => groupBy(arr, obj => dateFns.format(obj.date, 'MMM DD, YYYY')),
      obj => Object.keys(obj).map(day => ({
        day,
        list: sortBy('date')(obj[day]),
      })),
      sortBy('day'),
    ])(transactions);

    dispatch(
      loadTransactionsSuccess({
        list: formattedTransactions,
        zecPrice: new BigNumber(store.get('ZEC_DOLLAR_PRICE')).toNumber(),
      }),
    );
  },
});

// $FlowFixMe
export const TransactionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionsView);
