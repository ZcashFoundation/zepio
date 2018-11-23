// @flow

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import todoReducer from './todo';

export const createRootReducer = (history: Object) => combineReducers({
  todos: todoReducer,
  router: connectRouter(history),
});
