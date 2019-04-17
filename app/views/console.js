// @flow

import React, { PureComponent, Fragment } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import styled, { withTheme } from 'styled-components';
import uuid from 'uuid/v4';

import { TextComponent } from '../components/text';

import ConsoleSymbolDark from '../assets/images/console_zcash_dark.png';
import ConsoleSymbolLight from '../assets/images/console_zcash_light.png';
import { DARK } from '../constants/themes';

const Wrapper = styled.div`
  max-height: 100%;
  overflow-y: auto;
  background-color: ${props => props.theme.colors.consoleBg};
  border: 1px solid ${props => props.theme.colors.consoleBorder};
  margin-top: ${props => props.theme.layoutContentPaddingTop};
  border-radius: ${props => props.theme.boxBorderRadius};
  padding: 30px;
`;

const ConsoleText = styled(TextComponent)`
  font-family: 'Source Code Pro', monospace;
`;

const ConsoleImg = styled.img`
  height: 200px;
  width: auto;
`;

const initialLog = `
  Thank you for running a Zcash node!
  You're helping to strengthen the network and contributing to a social good :)

  In order to ensure you are adequately protecting your privacy when using Zcash, please see <https://z.cash/support/security/>.
`;

const defaultState = `
  Thank you for running a Zcash node!
  You're helping to strengthen the network and contributing to a social good :)
  In order to ensure you are adequately protecting your privacy when using Zcash, please see <https://z.cash/support/security/>.

  Block height | 0
  Connections | 0
  Network solution rate | 0 Sol/s
  You are currently not mining.
  To enable mining, add 'gen=1' to your zcash.conf and restart.

  Since starting this node 0 minutes, 0 seconds ago:
- You have validated 0 transactions!
\n
------------------------------------------
`;

const breakpoints = [1, 4, 7, 10, 13];

type Props = {
  theme: AppTheme,
};

type State = {
  log: string,
};

class Component extends PureComponent<Props, State> {
  state = {
    log: defaultState,
  };

  componentDidMount() {
    ipcRenderer.on('zcashd-log', (event: empty, message: string) => {
      this.setState(() => ({ log: initialLog + message }));
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners('zcashd-log');
  }

  render() {
    const { log } = this.state;
    const { theme } = this.props;

    const ConsoleSymbol = theme.mode === DARK ? ConsoleSymbolDark : ConsoleSymbolLight;

    return (
      <Wrapper id='console-wrapper'>
        <Fragment>
          <ConsoleImg src={ConsoleSymbol} alt='Zcashd' />
          {log.split('\n').map((item, idx) => (
            <Fragment key={uuid()}>
              <ConsoleText value={item} />
              {breakpoints.includes(idx) ? <br /> : null}
            </Fragment>
          ))}
        </Fragment>
      </Wrapper>
    );
  }
}

export const ConsoleView = withTheme(Component);
