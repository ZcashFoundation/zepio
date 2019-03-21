// @flow

export const asyncFilter = async (array: any[], fn: any => Promise<boolean>): Promise<any[]> => {
  const result = [];

  /* eslint-disable no-restricted-syntax */
  /* eslint-disable no-await-in-loop */

  for (const cur of array) {
    if (await fn(cur)) result.push(cur);
  }

  return result;
};
