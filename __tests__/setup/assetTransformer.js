// @flow

const path = require('path');

module.exports = {
  process(filename: any) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
