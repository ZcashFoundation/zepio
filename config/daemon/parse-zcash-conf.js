// @flow
import fs from 'fs';

import { locateZcashConf } from './locate-zcash-conf';
import { filterObjectNullKeys } from '../../app/utils/filter-object-null-keys';
import store from '../electron-store';

type ZcashConfFile = {
  testnet: ?string,
  regtest: ?string,
  proxy: ?string,
  bind: ?string,
  whitebind: ?string,
  addnode: ?string,
  connect: ?string,
  listen: ?string,
  maxconnections: ?string,
  server: ?string,
  rpcbind: ?string,
  rpcuser: ?string,
  rpcpassword: ?string,
  rpcclienttimeout: ?string,
  rpcallowip: ?string,
  rpcport: ?string,
  rpcconnect: ?string,
  sendfreetransactions: ?string,
  txconfirmtarget: ?string,
  gen: ?string,
  genproclimit: ?string,
  keypool: ?string,
  paytxfee: ?string,
};

export const parseZcashConf = (): Promise<Array<string>> => new Promise((resolve, reject) => {
  fs.readFile(locateZcashConf(), (err, file) => {
    // TODO: Maybe we can create the zcash.conf on the fly here
    if (err) return reject(err);

    const fileString = file.toString();

    // $FlowFixMe
    const { rpcuser, rpcpassword, ...payload }: ZcashConfFile = filterObjectNullKeys(
      fileString.split('\n').reduce((acc, cur) => {
        const [key, value] = cur.split('=');
        return { ...acc, [key]: value };
      }, {}),
    );

    if (rpcuser && rpcpassword) {
      store.set('rpcuser', rpcuser);
      store.set('rpcpassword', rpcpassword);
    }

    // $FlowFixMe
    resolve(Object.keys(payload).reduce((acc, key) => acc.concat(`-${key}=${payload[key]}`), []));
  });
});
