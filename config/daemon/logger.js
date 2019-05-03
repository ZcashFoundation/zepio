// @flow
import fs from 'fs';
import path from 'path';
import { app } from '../electron'; // eslint-disable-line

const getLogsFileName = () => path.join(app.getPath('userData'), 'main-process-logs.txt');

// eslint-disable-next-line no-console
export const log = (...message: Array<*>) => {
  console.log('[Zcash Daemon]', ...message); // eslint-disable-line
  fs.appendFileSync(
    getLogsFileName(),
    message
      .map((msg) => {
        if (msg instanceof Error) {
          return `${JSON.stringify(msg, Object.getOwnPropertyNames(msg))}\n`;
        }

        if (typeof msg === 'object') {
          return `${JSON.stringify(msg)}\n`;
        }

        return `${msg}\n`;
      })
      .join(''),
  );
};

export const cleanLogs = () => fs.writeFileSync(getLogsFileName(), '');
