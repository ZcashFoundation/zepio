// @flow

import React, { Component, Fragment } from 'react';
import { ipcRenderer } from 'electron';
import styled from 'styled-components';
import generateRandomString from '../utils/generate-random-string';

const Wrapper = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

type Props = {};

type State = {
  log: string,
};

export class ConsoleView extends Component<Props, State> {
  scrollView = React.createRef();

  state = {
    log: '',
  };

  componentDidMount() {
    ipcRenderer.on('zcashd-log', (event, message) => {
      this.setState(state => ({
        log: `${state.log}\n${message}`,
      }));

      if (this.scrollView && this.scrollView.current) {
        // eslint-disable-next-line
        this.scrollView.current.scrollTop = this.scrollView.current.scrollHeight;
      }
    });
  }

  render() {
    const { log } = this.state;

    return (
      <Wrapper ref={this.scrollView}>
        {log
          && log.split('\n').map(item => (
            <Fragment key={generateRandomString()}>
              {item}
              <br />
            </Fragment>
          ))}
      </Wrapper>
    );
  }
}
