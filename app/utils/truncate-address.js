// @flow

export const truncateAddress = (address: string = '') => `${address.substr(0, 20)}...${address.substr(
  address.length - 10,
  address.length,
)}`;
