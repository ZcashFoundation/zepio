// @flow

export const formatNumber = ({ value, append = '' }: { value: number, append?: string }) => `${append}${(value || 0).toLocaleString()}`;
