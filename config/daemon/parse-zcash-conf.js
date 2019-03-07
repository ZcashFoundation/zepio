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
    if (err) return reject(err);

    const fileString = file.toString();

    // $FlowFixMe
    const { rpcuser, rpcpassword, ...payload }: ZcashConfFile = filterObjectNullKeys(
      fileString.split('\n').reduce((acc, cur) => {
        if (!cur) return acc;

        const line = cur.trim();

        if (line.startsWith('#')) return acc;

        const [key, value] = cur.split('=');
        return { ...acc, [key.trim().toLowerCase()]: value.trim() };
      }, {}),
    );

    store.set('rpcuser', rpcuser || '');
    store.set('rpcpassword', rpcpassword || '');

    // $FlowFixMe
    resolve(Object.keys(payload).reduce((acc, key) => acc.concat(`-${key}=${payload[key]}`), []));
  });
});

export const parseCmdArgs = (cmd: string): { user: string, password: string } => {
  const rpcUserInArgs = cmd.split(' ').find(x => x.startsWith('-rpcuser'));
  const rpcPasswordInArgs = cmd.split(' ').find(x => x.startsWith('-rpcpassword'));

  const rpcUser = rpcUserInArgs ? rpcUserInArgs.replace('-rpcuser=', '') : '';
  const rpcPassword = rpcPasswordInArgs ? rpcPasswordInArgs.replace('-rpcpassword=', '') : '';

  return { user: rpcUser, password: rpcPassword };
};
