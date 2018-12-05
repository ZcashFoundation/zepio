// @flow
import got from 'got';

import { METHODS, type APIMethods } from './utils';

// TODO: Fix RPC connect params
const RPC = {
  host: 'localhost',
  port: 8232,
  user: 'george',
  password: '123456',
};

const client = got.extend({
  method: 'POST',
  json: true,
  auth: `${RPC.user}:${RPC.password}`,
});

// $FlowFixMe
const api: APIMethods = METHODS.reduce(
  (obj, method) => ({
    ...obj,
    [method]: (...args) => client
      .post(`http://${RPC.host}:${RPC.port}`, {
        body: {
          method,
          jsonrpc: '2.0',
          id: Date.now(),
          params: args,
        },
      })
      .then(data => Promise.resolve(data.body && data.body.result)),
  }),
  {},
);

export default api;
