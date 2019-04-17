// @flow

import got from 'got';

import { METHODS, type APIMethods } from './utils';
import store from '../config/electron-store';
import { isTestnet } from '../config/is-testnet';

const getRPCConfig = () => ({
  host: '127.0.0.1',
  port: isTestnet() ? 18232 : 8232,
  user: store.get('rpcuser'),
  password: store.get('rpcpassword'),
});

const getMessage = (statusCode) => {
  switch (statusCode) {
    case 401:
      return 'Not authorized to access Zcash RPC, please check your rpcuser and rpcpassword';
    default:
      return 'Something went wrong';
  }
};

const api: APIMethods = METHODS.reduce(
  (obj, method) => ({
    ...obj,
    [method]: (...args) => {
      const RPC = getRPCConfig();
      return (
        got
          .post(`http://${RPC.host}:${RPC.port}`, {
            method: 'POST',
            json: true,
            auth: `${RPC.user}:${RPC.password}`,
            body: {
              method,
              jsonrpc: '2.0',
              id: Date.now(),
              params: args,
            },
          })
          .then(data => Promise.resolve(data.body && data.body.result))
          // eslint-disable-next-line
          .catch(payload => Promise.reject({
            message: payload.body?.error?.message || getMessage(payload.statusCode),
            statusCode: payload.statusCode,
          }))
      );
    },
  }),
  {},
);

// eslint-disable-next-line
export default api;
