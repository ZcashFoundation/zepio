// @flow

import { connect } from 'react-redux';
import eres from 'eres';
import flow from 'lodash.flow';
import groupBy from 'lodash.groupby';
import dateFns from 'date-fns';
import { DashboardView } from '../views/dashboard';
import rpc from '../../services/api';
import store from '../../config/electron-store';
import {
  loadWalletSummary,
  loadWalletSummarySuccess,
  loadWalletSummaryError,
} from '../redux/modules/wallet';

import type { AppState } from '../types/app-state';
import type { Dispatch } from '../types/redux';

const mapStateToProps = ({ walletSummary }: AppState) => ({
  total: walletSummary.total,
  shielded: walletSummary.shielded,
  transparent: walletSummary.transparent,
  error: walletSummary.error,
  isLoading: walletSummary.isLoading,
  zecPrice: walletSummary.zecPrice,
  addresses: walletSummary.addresses,
  transactions: walletSummary.transactions,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getSummary: async () => {
    dispatch(loadWalletSummary());

    const [err, walletSummary] = await eres(rpc.z_gettotalbalance());

    if (err) return dispatch(loadWalletSummaryError({ error: err.message }));

    const [addressesErr, addresses] = await eres(rpc.z_listaddresses());

    // eslint-disable-next-line
    if (addressesErr) return dispatch(loadWalletSummaryError({ error: addressesErr.message }));

    const [transactionsErr, transactions] = await eres(rpc.listtransactions());

    if (transactionsErr) {
      return dispatch(
        loadWalletSummaryError({ error: transactionsErr.message }),
      );
    }

    dispatch(
      loadWalletSummarySuccess({
        transparent: walletSummary.transparent,
        total: walletSummary.total,
        shielded: walletSummary.private,
        addresses,
        transactions: flow([
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

export const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardView);
