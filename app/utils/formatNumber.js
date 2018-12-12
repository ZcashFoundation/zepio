// @flow

export default (number: number, append?: string = '') => `${append}${number.toLocaleString('de-DE')}`;
