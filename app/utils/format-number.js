// @flow
export const formatNumber = ({ value, append = '' }: { value: number | string, append?: string }) => `${append}${(value || 0).toLocaleString()}`;
