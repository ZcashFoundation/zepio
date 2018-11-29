import electron from 'electron';
import { Application } from 'spectron';

export const TIMEOUT = 10000;

export const getApp = () => new Application({
  path: electron,
  args: ['.'],
  startTimeout: TIMEOUT,
  waitTimeout: TIMEOUT,
});
