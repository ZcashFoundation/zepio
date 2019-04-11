// @flow
/* eslint-disable */
import path from 'path';
import fs from 'fs';
import { app } from 'electron';

fs.unlink(path.join(app.getPath('appData'), 'zepio', 'config.json'), err => {
  if (err) {
    console.log("Couldn't remove config.json", err);
  } else {
    console.log('electron-store cleaned');
  }

  process.exit(0);
});
