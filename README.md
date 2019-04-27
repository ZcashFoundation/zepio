# Zepio | ZEC Wallet

Zepio is a Sapling-enabled shielded-address first Zcash wallet, featuring cross-platform applications (macOS, Windows and Linux), built-in full node with support for `mainnet` and `testnet`, as well as `dark` and `light` themes.

![Flow Coverage](./public/flow-coverage-badge.svg)

### [Latest Documentation at https://zepiowallet.com](https://zepiowallet.com)

> CURRENTLY ONLY A PRE-RELEASE AVAILABLE


## Stack Information

- [Electron](https://github.com/electron/electron): desktop application builder

- [React](https://facebook.github.io/react/): UI view layer

- [Redux](http://redux.js.org/): predictable state container

- [Webpack](http://webpack.github.io/): module bundler

- [Webpack Development Server](https://webpack.github.io/docs/webpack-dev-server.html): development server

- [Babel](http://babeljs.io/): ES7/JSX transpilling

- [ESLint](http://eslint.org/): code rules and linting

- [React Router](https://github.com/reactjs/react-router): routing solution for react

- [Styled Components](https://www.styled-components.com/): visual primitives for theming applications

## Installation

```bash

yarn install

```

## Development

To run the application you simply need to run

```bash

yarn start

```

This will kickstart the webpack development server and serve the app on port 8080, as well as launch the Electron wrapper for the application, which houses the `zcashd` daemon process.

## License

MIT © Zcash Foundation 2019
