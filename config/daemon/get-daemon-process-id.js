// @flow
import fs from 'fs';
import path from 'path';
import { getZcashFolder } from './get-zcash-folder';

const ZCASH_PID_FILE = 'zcashd.pid';

export const getDaemonProcessId = (zcashPath?: string) => {
  try {
    const myPath = zcashPath || getZcashFolder();
    const buffer = fs.readFileSync(path.join(myPath, ZCASH_PID_FILE));
    const pid = Number(buffer.toString().trim());
    return pid;
  } catch (err) {
    return null;
  }
};
