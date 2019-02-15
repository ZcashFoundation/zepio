// @flow

/* eslint-disable import/no-extraneous-dependencies */
import electron from 'electron';
import { Application } from 'spectron';

export const TIMEOUT = 20000;

export const getApp = () => new Application({
  path: electron,
  args: ['.'],
  startTimeout: TIMEOUT,
  waitTimeout: TIMEOUT,
  quitTimeout: TIMEOUT,
  env: {
    NODE_ENV: 'test',
  },
});
