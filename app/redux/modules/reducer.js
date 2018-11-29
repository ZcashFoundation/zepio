// @flow

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { History } from 'react-router-dom';

import todoReducer from './todo';

export const createRootReducer = (history: History) => combineReducers({
  todos: todoReducer,
  router: connectRouter(history),
});
