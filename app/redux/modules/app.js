// @flow
import type { Action } from '../../types/redux';

// Actions
export const SHOW_ERROR_MODAL = 'SHOW_ERROR_MODAL';
export const HIDE_ERROR_MODAL = 'HIDE_ERROR_MODAL';

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

export type State = {
  isErrorModalVisible: boolean,
  error: string | null,
};

const initialState: State = {
  isErrorModalVisible: false,
  error: null,
};

// eslint-disable-next-line
export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case SHOW_ERROR_MODAL:
      return { isErrorModalVisible: true, error: action.payload.error };
    case HIDE_ERROR_MODAL:
      return { isErrorModalVisible: false, error: null };
    default:
      return state;
  }
};
