// @flow

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { RouterHistory } from 'react-router-dom';

import todoReducer from './todo';

export const createRootReducer = (history: RouterHistory) => combineReducers({
  todos: todoReducer,
  router: connectRouter(history),
});
