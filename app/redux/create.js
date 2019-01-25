// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';
import thunk from 'redux-thunk';

import { createRootReducer } from './modules/reducer';

export const history = createHashHistory();

const shouldEnableDevTools = (process.env.NODE_ENV !== 'production'
    || process.env.NODE_ENV !== 'staging')
  && window.devToolsExtension;

export const configureStore = (initialState: Object) => {
  const middleware = applyMiddleware(thunk, routerMiddleware(history));

  const enhancer = compose(
    middleware,
    shouldEnableDevTools ? window.devToolsExtension() : f => f,
  );

  // $FlowFixMe
  return createStore(createRootReducer(history), initialState, enhancer);
};
