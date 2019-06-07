// @flow

import { connect } from 'react-redux';
import eres from 'eres';
import { BigNumber } from 'bignumber.js';

import { updateNodeSyncStatus } from '../redux/modules/app';
import { StatusPill } from '../components/status-pill';
import rpc from '../../services/api';
import { NODE_SYNC_TYPES } from '../constants/node-sync-types';
import { FETCH_STATE } from '../constants/fetch-states';

import type { Dispatch } from '../types/redux';
import type { AppState } from '../types/app-state';

export type MapStateToProps = {|
  nodeSyncProgress: number,
  nodeSyncType: 'ready' | 'syncing' | 'error',
  isRefetching: boolean,
|};

const mapStateToProps = ({ app, walletSummary, receive }: AppState): MapStateToProps => ({
  nodeSyncProgress: app.nodeSyncProgress,
  nodeSyncType: app.nodeSyncType,
  isRefetching:
    walletSummary.fetchState === FETCH_STATE.REFETCHING
    || receive.fetchState === FETCH_STATE.REFETCHING,
});

export type MapDispatchToProps = {|
  getBlockchainStatus: () => Promise<void>,
|};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  getBlockchainStatus: async () => {
    const [blockchainErr, blockchaininfo] = await eres(rpc.getblockchaininfo());

    if (blockchainErr || !blockchaininfo) {
      return dispatch(
        updateNodeSyncStatus({
          nodeSyncProgress: 0,
          nodeSyncType: NODE_SYNC_TYPES.ERROR,
        }),
      );
    }

    const newProgress = blockchaininfo.verificationprogress * 100;

    dispatch(
      updateNodeSyncStatus({
        nodeSyncProgress: newProgress,
        nodeSyncType: new BigNumber(newProgress).gt(99.99)
          ? NODE_SYNC_TYPES.READY
          : NODE_SYNC_TYPES.SYNCING,
      }),
    );
  },
});

// $FlowFixMe
export const StatusPillContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatusPill);
