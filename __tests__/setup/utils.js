// @flow

/* eslint-disable import/no-extraneous-dependencies */
import electron from 'electron';
import { Application } from 'spectron';

export const getApp = () => new Application({
  path: electron,
  args: ['.'],
  startTimeout: 20000,
  waitTimeout: 5000,
  quitTimeout: 5000,
  env: {
    NODE_ENV: 'test',
  },
});
