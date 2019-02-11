// @flow
/* eslint-disable max-len */

// $FlowFixMe
export const sortBy = <T>(field: string) => (arr: T[]): T[] => arr.sort((a, b) => (a[field] > b[field] ? 1 : -1));

// $FlowFixMe
export const sortByDescend = <T>(field: string) => (arr: T[]): T[] => arr.sort((a, b) => (a[field] < b[field] ? 1 : -1));
