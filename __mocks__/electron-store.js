/* eslint-disable */
module.exports = class {
  constructor({ encryptionKey }) {
    this.encryptionKey = encryptionKey;
  }

  get() {
    return 'test value';
  }
};
