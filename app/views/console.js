// @flow

import React, { Component, Fragment } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import { TextComponent } from '../components/text';

import ConsoleSymbol from '../assets/images/console_zcash.png';

const Wrapper = styled.div`
  max-height: 100%;
  overflow-y: auto;
  background-color: ${props => props.theme.colors.cardBackgroundColor};
  margin-top: ${props => props.theme.layoutContentPaddingTop};
  border-radius: ${props => props.theme.boxBorderRadius};
  padding: 38px 33.5px;
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

type Props = {};

type State = {
  log: string,
};

export class ConsoleView extends Component<Props, State> {
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
