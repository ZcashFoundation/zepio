// @flow

import { connect } from 'react-redux';
import eres from 'eres';
import flow from 'lodash.flow';
import groupBy from 'lodash.groupby';
import dateFns from 'date-fns';
import { BigNumber } from 'bignumber.js';
import { DashboardView } from '../views/dashboard';
import rpc from '../../services/api';
import { listShieldedTransactions } from '../../services/shielded-transactions';
import store from '../../config/electron-store';
import {
  loadWalletSummary,
  loadWalletSummarySuccess,
  loadWalletSummaryError,
} from '../redux/modules/wallet';
import { sortByDescend } from '../utils/sort-by-descend';

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

    const [walletErr, walletSummary] = await eres(rpc.z_gettotalbalance());
    const [zAddressesErr, zAddresses = []] = await eres(rpc.z_listaddresses());
    const [tAddressesErr, tAddresses = []] = await eres(rpc.getaddressesbyaccount(''));
    const [transactionsErr, transactions] = await eres(rpc.listtransactions());

    if (walletErr || zAddressesErr || tAddressesErr || transactionsErr) {
      return dispatch(
        loadWalletSummaryError({
          error: 'Something went wrong!',
        }),
      );
    }

    const formattedTransactions: Array<Object> = flow([
      arr => arr.map(transaction => ({
        transactionId: transaction.txid || 'N/A',
        type: transaction.category,
        date: new Date(transaction.time * 1000).toISOString(),
        address: transaction.address,
        amount: Math.abs(transaction.amount),
        fees: transaction.fee ? new BigNumber(transaction.fee).abs().toFormat(4) : 'N/A',
      })),
      arr => groupBy(arr, obj => dateFns.format(obj.date, 'MMM DD, YYYY')),
      obj => Object.keys(obj).map(day => ({
        day,
        jsDay: new Date(day),
        list: sortByDescend('date')(obj[day]),
      })),
      sortByDescend('jsDay'),
    ])([...transactions, ...listShieldedTransactions()]);

    if (!zAddresses.length) {
      const [, newZAddress] = await eres(rpc.z_getnewaddress());

      if (newZAddress) zAddresses.push(newZAddress);
    }

    if (!tAddresses.length) {
      const [, newTAddress] = await eres(rpc.getnewaddress(''));

      if (newTAddress) tAddresses.push(newTAddress);
    }

    dispatch(
      loadWalletSummarySuccess({
        transparent: walletSummary.transparent,
        total: walletSummary.total,
        shielded: walletSummary.private,
        addresses: [...zAddresses, ...tAddresses],
        transactions: formattedTransactions,
        zecPrice: new BigNumber(store.get('ZEC_DOLLAR_PRICE')).toNumber(),
      }),
    );
  },
});

// $FlowFixMe
export const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardView);
