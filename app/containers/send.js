// @flow
import { connect } from 'react-redux';
import eres from 'eres';
import { BigNumber } from 'bignumber.js';

import rpc from '../../services/api';
import { SendView } from '../views/send';

import {
  sendTransaction,
  sendTransactionSuccess,
  sendTransactionError,
  resetSendTransaction,
  validateAddressSuccess,
  validateAddressError,
} from '../redux/modules/send';

import filterObjectNullKeys from '../utils/filterObjectNullKeys';

import type { AppState } from '../types/app-state';
import type { Dispatch } from '../types/redux';

export type SendTransactionInput = {
  from: string,
  to: string,
  amount: string,
  fee: number,
  memo: string,
};

const mapStateToProps = ({ walletSummary, sendStatus }: AppState) => ({
  balance: walletSummary.total,
  zecPrice: walletSummary.zecPrice,
  addresses: walletSummary.addresses,
  error: sendStatus.error,
  isSending: sendStatus.isSending,
  operationId: sendStatus.operationId,
  isToAddressValid: sendStatus.isToAddressValid,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendTransaction: async ({
    from,
    to,
    amount,
    fee,
    memo,
  }: SendTransactionInput) => {
    dispatch(sendTransaction());

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
        dispatch(
          sendTransactionSuccess({ operationId: operationStatus.result.txid }),
        );
      }

      if (operationStatus && operationStatus.status === 'failed') {
        clearInterval(interval);
        dispatch(
          sendTransactionError({ error: operationStatus.error.message }),
        );
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
});

// $FlowFixMe
export const SendContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendView);
