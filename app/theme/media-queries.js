// @flow

import { css } from 'styled-components';

// Media Queries
export const sizes = {
  main: 910,
  // desktop: 1024,
  // largeDesktop: 1280,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args: any) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});
