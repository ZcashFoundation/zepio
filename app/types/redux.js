// @flow

import type { AppState } from './app-state';

export type FetchState = 'INITIALIZING' | 'REFETCHING' | 'SUCCESS' | 'ERROR';

export type Action = { type: string, payload: Object, fetchState?: FetchState };
export type GetState = () => AppState;
export type Dispatch = (action: Action) => void;
export type Middleware = ({ dispatch: Dispatch, getState: GetState }) => (
  (Action) => void,
) => Action => void;
