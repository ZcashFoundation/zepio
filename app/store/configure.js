// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { createRootReducer } from '../reducers';

export const history = createBrowserHistory();

export const configureStore = (initialState: Object) => {
  let enhancer;
  const middleware = applyMiddleware(
    thunk,
    routerMiddleware(history),
  );

  if (
    process.env.NODE_ENV !== 'production'
    || process.env.NODE_ENV !== 'staging'
  ) {
    enhancer = compose(
      middleware,
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    );
  } else {
    enhancer = compose(middleware);
  }

  return createStore(
    createRootReducer(history),
    initialState,
    enhancer,
  );
};
