// @flow

import eres from 'eres';
import processExists from 'process-exists';

// eslint-disable-next-line
export default (processName: string): Promise<void> => new Promise((resolve) => {
  const interval = setInterval(async () => {
    const [, isRunning] = await eres(processExists(processName));

    if (!isRunning) {
      clearInterval(interval);
      setTimeout(resolve, 1000);
    }
  }, 500);
});
