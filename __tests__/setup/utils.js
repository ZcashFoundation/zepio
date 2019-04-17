// @flow

/* eslint-disable import/no-extraneous-dependencies */
import electron from 'electron';
import { Application } from 'spectron';

export const getApp = () => new Application({
  path: electron,
  args: ['.'],
  startTimeout: 20000,
  waitTimeout: 10000,
  quitTimeout: 10000,
  connectionRetryCount: 30,
  env: {
    NODE_ENV: 'test',
  },
});
