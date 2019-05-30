// @flow

// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill';

import createTestServer from '@astrocoders/create-test-server';

const transactions = [];

const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

const handler = (server) => {
  console.log('[MOCK RPC API]', server.url); // eslint-disable-line

  server.get('/', (req, res) => {
    res.send('Zcash RPC');
  });

  server.post('/', async (req, res) => {
    const { method } = req.body;

    switch (method) {
      case 'getinfo':
        sleep(500).then(() => res.send({ result: { version: 1.0 } }));
        break;
      case 'getblockchaininfo':
        return res.send({ result: { verificationprogress: 1 } });
      case 'z_gettotalbalance':
        return res.send({
          result: { transparent: 2.5, private: 3.5, total: 6 },
        });
      case 'z_listaddresses':
        return res.send({
          result: ['zs1z7rejlpsa98s2rrrfkwmaxu53e4ue0ulcrw0h4x5g8jl04tak0d3mm47vdtahatqrlkngh9sly'],
        });
      case 'getaddressesbyaccount':
        return res.send({
          result: ['t3Pnbg7XjP7FGPBUuz75H65aczphHgkpoJW'],
        });
      case 'listtransactions':
        return res.send({
          result: transactions,
        });
      case 'z_sendmany':
        // eslint-disable-next-line
        sleep(1000).then(() => {
          const [, [obj], amount, fee] = req.body.params;

          if ((obj.address[0] === 'z' || obj.address[0] === 't') && amount > 0) {
            transactions.push({
              account: '',
              address: obj.address,
              category: 'send',
              amount: obj.amount,
              vout: 0,
              fee,
              confirmations: 10,
              blockhash: 20,
              blockindex: 10,
              txid: `operation-id-${transactions.length + 1}`,
              time: Date.now(),
              timereceived: Date.now(),
              comment: '',
              otheraccount: '',
              size: 10,
            });

            return res.send({ result: 'operation-id-1' });
          }

          return res.status(500).send({ error: { message: 'Invalid address!' } });
        });
        break;
      case 'z_validateaddress':
        // eslint-disable-next-line
        const [zAd] = req.body.params;

        if (zAd[0] === 'z' || zAd[0] === 't') {
          return res.send({ result: { isvalid: true } });
        }

        return res.send({ result: { isvalid: false } });
      case 'validateaddress':
        // eslint-disable-next-line
        const [tAd] = req.body.params;

        if (tAd[0] === 'z' || tAd[0] === 't') {
          return res.send({ result: { isvalid: true } });
        }

        return res.send({ result: { isvalid: false } });
      case 'z_getoperationstatus':
        return res.send({
          result: [{ id: 'operation-id-1', status: 'success', result: { txid: 'txid-1' } }],
        });
      case 'z_getbalance':
        return res.send({
          result: 5,
        });
      case 'z_getnewaddress':
        return res.send({
          result: 'zs1z7rejlpsa98s2rrrfkwmaxu53e4ue0ulcrw0h4x5g8jl04tak0d3mm47vdtahatqrlkngh9soy',
        });
      case 'getnewaddress':
        return res.send({
          result: 't1VpYecBW4UudbGcy4ufh61eWxQCoFaUrPs',
        });
      case 'getunconfirmedbalance':
        return res.send({
          result: 10,
        });
      case 'ping':
        return res.send(null);
      default:
        return null;
    }
  });
};

createTestServer({
  httpPort: '8232',
  bodyParser: true,
}).then(handler);

createTestServer({
  httpPort: '18232',
  bodyParser: true,
}).then(handler);
