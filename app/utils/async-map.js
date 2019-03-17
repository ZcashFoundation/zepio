// @flow

export const asyncMap = async (array: any[], fn: any => Promise<any>): Promise<any[]> => {
  const result = [];

  /* eslint-disable no-restricted-syntax */
  /* eslint-disable no-await-in-loop */

  for (const cur of array) {
    result.push(await fn(cur));
  }

  return result;
};
