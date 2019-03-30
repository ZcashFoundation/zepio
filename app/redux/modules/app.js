// @flow

import electronStore from '../../../config/electron-store';

import { ZCASH_NETWORK, EMBEDDED_DAEMON } from '../../constants/zcash-network';

import type { Action } from '../../types/redux';

export type State = {|
  isErrorModalVisible: boolean,
  error: string | null,
  nodeSyncProgress: number,
  nodeSyncType: 'ready' | 'syncing' | 'error',
  zcashNetwork: string,
  embeddedDaemon: boolean,
|};

// Actions
export const SHOW_ERROR_MODAL = 'SHOW_ERROR_MODAL';
export const HIDE_ERROR_MODAL = 'HIDE_ERROR_MODAL';
export const UPDATE_NODE_SYNC_STATUS = 'UPDATE_NODE_SYNC_STATUS';

export const showErrorModal = ({ error }: { error: string }) => ({
  type: SHOW_ERROR_MODAL,
  payload: {
    error,
  },
});

export const closeErrorModal = () => ({
  type: HIDE_ERROR_MODAL,
  payload: {},
});

export const updateNodeSyncStatus = ({
  nodeSyncProgress,
  nodeSyncType,
}: {
  nodeSyncProgress: number,
  nodeSyncType: $PropertyType<State, 'nodeSyncType'>,
}) => ({
  type: UPDATE_NODE_SYNC_STATUS,
  payload: {
    nodeSyncProgress,
    nodeSyncType,
  },
});

const initialState: State = {
  isErrorModalVisible: false,
  error: null,
  nodeSyncProgress: 0,
  nodeSyncType: 'syncing',
  zcashNetwork: electronStore.get(ZCASH_NETWORK),
  embeddedDaemon: electronStore.get(EMBEDDED_DAEMON),
};

// eslint-disable-next-line
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case SHOW_ERROR_MODAL:
      return { isErrorModalVisible: true, error: action.payload.error };
    case HIDE_ERROR_MODAL:
      return { isErrorModalVisible: false, error: null };
    case UPDATE_NODE_SYNC_STATUS:
      return {
        ...state,
        nodeSyncProgress: action.payload.nodeSyncProgress,
        nodeSyncType: action.payload.nodeSyncType,
      };
    default:
      return state;
  }
};
