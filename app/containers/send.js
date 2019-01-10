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

    const [sendErr] = await eres(
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

    // eslint-disable-next-line
    if (sendErr) return dispatch(sendTransactionError({ error: sendErr.message }));

    dispatch(sendTransactionSuccess());
  },
});

export const SendContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendView);
