// @flow
import { connect } from 'react-redux';
import eres from 'eres';
import flow from 'lodash.flow';
import groupBy from 'lodash.groupby';
import dateFns from 'date-fns';

import { TransactionsView } from '../views/transactions';
import {
  loadTransactions,
  loadTransactionsSuccess,
  loadTransactionsError,
} from '../redux/modules/transactions';
import rpc from '../../services/api';
import store from '../../config/electron-store';

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

    const [transactionsErr, transactions = []] = await eres(
      rpc.listtransactions(),
    );

    if (transactionsErr) {
      return dispatch(
        loadTransactionsError({ error: transactionsErr.message }),
      );
    }

    dispatch(
      loadTransactionsSuccess({
        list: flow([
          arr => arr.map(transaction => ({
            transactionId: transaction.txid,
            type: transaction.category,
            date: new Date(transaction.time * 1000).toISOString(),
            address: transaction.address,
            amount: Math.abs(transaction.amount),
          })),
          arr => groupBy(arr, obj => dateFns.format(obj.date, 'MMM DD, YYYY')),
        ])(transactions),
        zecPrice: store.get('ZEC_DOLLAR_PRICE'),
      }),
    );
  },
});

export const TransactionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionsView);
