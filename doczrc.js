/* eslint-disable import/no-extraneous-dependencies */
import { css } from 'docz-plugin-css';

export default {
  title: 'Zcash Foundation',
  description: 'Zcash Foundation User Interface Styleguide',
  plugins: [css()],
  htmlContext: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=PT+Sans:400,700',
        },
      ],
    },
  },
};
