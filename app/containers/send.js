// @flow

import eres from 'eres';
import { connect } from 'react-redux';
import { BigNumber } from 'bignumber.js';

import store from '../../config/electron-store';
import rpc from '../../services/api';
import { SendView } from '../views/send';

import {
  loadZECPrice,
  sendTransaction,
  sendTransactionSuccess,
  sendTransactionError,
  resetSendTransaction,
  validateAddressSuccess,
  validateAddressError,
  loadAddressBalanceSuccess,
  loadAddressBalanceError,
} from '../redux/modules/send';

import { filterObjectNullKeys } from '../utils/filter-object-null-keys';
import { asyncMap } from '../utils/async-map';
import { saveShieldedTransaction } from '../../services/shielded-transactions';

import type { AppState } from '../types/app-state';
import type { Dispatch } from '../types/redux';

import { loadAddressesSuccess, loadAddressesError } from '../redux/modules/receive';

export type SendTransactionInput = {
  from: string,
  to: string,
  amount: string,
  fee: number,
  memo: string,
};

export type MapStateToProps = {|
  balance: number,
  zecPrice: number,
  addresses: { address: string, balance: number }[],
  error: string | null,
  isSending: boolean,
  operationId: string | null,
  isToAddressValid: boolean,
|};

const mapStateToProps = ({ sendStatus, receive }: AppState): MapStateToProps => ({
  balance: sendStatus.addressBalance,
  zecPrice: sendStatus.zecPrice,
  addresses: receive.addresses,
  error: sendStatus.error,
  isSending: sendStatus.isSending,
  operationId: sendStatus.operationId,
  isToAddressValid: sendStatus.isToAddressValid,
});

export type MapDispatchToProps = {|
  sendTransaction: SendTransactionInput => Promise<void>,
  loadAddresses: () => Promise<void>,
  resetSendView: () => void,
  validateAddress: ({ address: string }) => Promise<void>,
  loadZECPrice: () => void,
  getAddressBalance: ({ address: string }) => Promise<void>,
|};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  sendTransaction: async ({
    from, to, amount, fee, memo,
  }) => {
    dispatch(sendTransaction());

    // $FlowFixMe
    const [sendErr, operationId] = await eres(
      rpc.z_sendmany(
        from,
        // $FlowFixMe
        [
          filterObjectNullKeys({
            address: to,
            amount: new BigNumber(amount).toNumber(),
            memo,
          }),
        ],
        1,
        new BigNumber(fee).toNumber(),
      ),
    );

    // eslint-disable-next-line max-len
    if (sendErr || !operationId) return dispatch(sendTransactionError({ error: sendErr.message }));

    /**
      Output is a list of operation status objects.
      [
        {“operationid”: “opid-12ee…”,
        “status”: “queued”},
        {“operationid”: “opd-098a…”, “status”: ”executing”},
        {“operationid”: “opid-9876”, “status”: ”failed”}
      ]

      When the operation succeeds, the status object will also include the result.
      {“operationid”: “opid-0e0e”, “status”:”success”, “execution_time”:”25”, “result”: {“txid”:”af3887654…”,...}}

      then the promise will only be resolved when a "success" or "failure" status is obtained
     */
    const interval = setInterval(async () => {
      const [, status] = await eres(rpc.z_getoperationstatus());

      const operationStatus = status.find(({ id }) => operationId === id);

      if (operationStatus && operationStatus.status === 'success') {
        clearInterval(interval);
        if (from.startsWith('z')) {
          saveShieldedTransaction({
            txid: operationStatus.result.txid,
            category: 'send',
            time: Date.now() / 1000,
            address: '(Shielded)',
            amount: new BigNumber(amount).toNumber(),
            memo,
          });
        }
        dispatch(sendTransactionSuccess({ operationId: operationStatus.result.txid }));
      }

      if (operationStatus && operationStatus.status === 'failed') {
        clearInterval(interval);
        dispatch(sendTransactionError({ error: operationStatus.error.message }));
      }
    }, 2000);
  },
  resetSendView: () => dispatch(resetSendTransaction()),
  validateAddress: async ({ address }: { address: string }) => {
    if (address.startsWith('z')) {
      const [, validationResult] = await eres(rpc.z_validateaddress(address));

      return dispatch(
        validateAddressSuccess({
          isValid: Boolean(validationResult && validationResult.isvalid),
        }),
      );
    }

    const [, validationResult] = await eres(rpc.validateaddress(address));

    if (validationResult) {
      return dispatch(
        validateAddressSuccess({
          isValid: Boolean(validationResult && validationResult.isvalid),
        }),
      );
    }

    return dispatch(validateAddressError());
  },
  loadAddresses: async () => {
    const [zAddressesErr, zAddresses] = await eres(rpc.z_listaddresses());

    const [tAddressesErr, transparentAddresses] = await eres(rpc.getaddressesbyaccount(''));

    if (zAddressesErr || tAddressesErr) return dispatch(loadAddressesError({ error: 'Something went wrong!' }));

    const latestzAdress = zAddresses[0]
      ? {
        address: zAddresses[0],
        balance: await rpc.z_getbalance(zAddresses[0]),
      }
      : null;

    const latesttAdress = transparentAddresses[0]
      ? {
        address: transparentAddresses[0],
        balance: await rpc.z_getbalance(transparentAddresses[0]),
      }
      : null;

    const allAddresses = await asyncMap(
      [...zAddresses.slice(1), ...transparentAddresses.slice(1)],
      async (address) => {
        const [err, response] = await eres(rpc.z_getbalance(address));

        if (!err && new BigNumber(response).isGreaterThan(0)) return { address, balance: response };

        return null;
      },
    );

    return dispatch(
      loadAddressesSuccess({
        addresses: [latesttAdress, latestzAdress, ...allAddresses].filter(Boolean),
      }),
    );
  },
  loadZECPrice: () => dispatch(
    loadZECPrice({
      value: Number(store.get('ZEC_DOLLAR_PRICE')),
    }),
  ),
  getAddressBalance: async ({ address }: { address: string }) => {
    const [err, balance] = await eres(rpc.z_getbalance(address));

    if (err) return dispatch(loadAddressBalanceError({ error: "Can't load your balance address" }));

    return dispatch(loadAddressBalanceSuccess({ balance }));
  },
});

// $FlowFixMe
export const SendContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendView);
