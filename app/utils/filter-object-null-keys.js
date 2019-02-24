// @flow

export const filterObjectNullKeys = (obj: Object) => Object.keys(obj).reduce((acc, cur) => {
  if (obj[cur] === null || obj[cur] === undefined || obj[cur] === '') {
    return acc;
  }

  return { ...acc, [cur]: obj[cur] };
}, {});
