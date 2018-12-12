// @flow

import React, { Component, Fragment } from 'react';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import { ipcRenderer } from 'electron';

type Props = {};

type State = {
  log: string | null,
};

export class ConsoleView extends Component<Props, State> {
  state = {
    log: null,
  };

  componentDidMount() {
    ipcRenderer.on('zcashd-log', (event, message) => {
      this.setState(() => ({
        log: message,
      }));
    });
  }

  render() {
    const { log } = this.state;

    return (
      <div className='dashboard'>
        {log
          && log.split('\n').map(item => (
            <Fragment key={`${item.slice(0, 10)}`}>
              {item}
              <br />
            </Fragment>
          ))}
      </div>
    );
  }
}
