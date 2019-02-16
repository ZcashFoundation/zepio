// @flow
export const truncateAddress = (address: string = '') => (address.length < 20
  ? address
  : `${address.substr(0, 20)}...${address.substr(address.length - 10, address.length)}`);
