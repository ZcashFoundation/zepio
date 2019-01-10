// @flow
/* eslint-disable max-len */
// $FlowFixMe
export default <T>(field: string) => (arr: T[]): T[] => arr.sort((a, b) => (a[field] < b[field] ? 1 : -1));
