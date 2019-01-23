// @flow
// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill';

import createTestServer from 'create-test-server';

createTestServer({
  httpPort: '18232',
}).then(async (server) => {
  console.log('[MOCK RPC API]', server.url);

  server.get('/', (req, res) => {
    res.send('Zcash RPC');
  });

  server.post('/', (req, res) => {
    const { method } = req.body;

    switch (method) {
      case 'getinfo':
        return res.send({ result: { version: 1.0 } });
      case 'getblockchaininfo':
        return res.send({ result: { verificationprogress: 0.5 } });
      case 'z_gettotalbalance':
        return res.send({
          result: { transparent: 2.5, private: 3.5, total: 6 },
        });
      default:
        return null;
    }
  });
});
