// @flow
/* eslint-disable import/no-extraneous-dependencies */
// $FlowFixMe
import { net } from 'electron';

type Payload = {
  [currency: string]: number,
};

/**
  WARNING:
  Just a super fast way to get the zec price
*/
export default (currencies: string[] = ['USD']): Promise<Payload> => new Promise((resolve, reject) => {
  const ENDPOINT = `https://min-api.cryptocompare.com/data/price?fsym=ZEC&tsyms=${currencies.join(
    ',',
  )}&api_key=${String(process.env.ZEC_PRICE_API_KEY)}`;

  const request = net.request(ENDPOINT);
  request.on('response', (response) => {
    let data = '';
    /* eslint-disable-next-line no-return-assign */
    response.on('data', chunk => (data += chunk));
    response.on('end', () => {
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });
  });
  request.end();
});
