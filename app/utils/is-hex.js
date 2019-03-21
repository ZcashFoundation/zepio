// @flow
const HEX_REGEX = /([0-9]|[a-f])/gim;

export const isHex = (input: ?string) => {
  if (!input) return false;

  return (input.match(HEX_REGEX) || []).length === input.length;
};
