// @flow
import '@babel/polyfill';

// eslint-disable-next-line import/no-unresolved
require('jest-extended');

// $FlowFixMe
jest.DEFAULT_TIMEOUT_INTERVAL = 20000;
jest.setTimeout(20000);
