// @flow
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
  )}&api_key=b6162b068ff9f8fe2872070b791146b06d186e83d5e52e49dcaa42ef8d1d3875`;

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
