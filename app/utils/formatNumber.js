// @flow

export default ({ value, append = '' }: { value: number, append?: string }) => `${append}${(value || 0).toLocaleString('de-DE')}`;
