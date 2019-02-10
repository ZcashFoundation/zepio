// @flow
export function ascii2hex(ascii: ?string): string {
  if (!ascii) return '';

  return ascii
    .split('')
    .map(letter => letter.charCodeAt(0).toString(16))
    .join('');
}
