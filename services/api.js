// @flow
/* eslint-disable no-console */

import got from 'got';

import { METHODS, type APIMethods } from './utils';
import store from '../config/electron-store';
import { isTestnet } from '../config/is-testnet';

const getRPCConfig = () => {
  const rpcport: string = store.get('rpcport');
  const rpcconnect: string = store.get('rpcconnect');

  return {
    host: rpcconnect || '127.0.0.1',
    port: rpcport || (isTestnet() ? 18232 : 8232),
    user: (store.get('rpcuser'): string),
    password: (store.get('rpcpassword'): string),
  };
};

const getMessage = (statusCode: number, isECONNREFUSED: boolean) => {
  if (isECONNREFUSED) {
    return 'Zepio could not find a daemon running, please check the logs!';
  }

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
      console.info('[RPC CALL]', {
        method,
        payload: args,
      });
      return got
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
        .then((data) => {
          console.log('[RPC CALL SUCCESS] -', method, data.body.result);
          return Promise.resolve(data.body && data.body.result);
        })
        .catch((payload) => {
          console.log(
            '[RPC CALL ERROR] - ',
            payload,
            payload.statusCode === 500 ? 'This may indicate that the daemon is still starting' : '',
          );
          // eslint-disable-next-line
          return Promise.reject({
            message:
              payload.body?.error?.message
              || getMessage(
                payload.statusCode,
                (payload.message || '').indexOf('ECONNREFUSED') !== -1,
              ),
            statusCode: payload.statusCode,
          });
        });
    },
  }),
  {},
);

// eslint-disable-next-line
export default api;
