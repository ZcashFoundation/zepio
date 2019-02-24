// @flow

import React, { PureComponent } from 'react';

import { Button } from './button';

type Props = {
  text: string,
  className?: string,
};

type State = { copied: boolean };

export class Clipboard extends PureComponent<Props, State> {
  static defaultProps = {
    className: '',
  };

  state = {
    copied: false,
  };

  handleClick = () => {
    const { text } = this.props;

    const el = document.createElement('textarea');
    el.value = text;

    if (document.body) document.body.appendChild(el);

    el.select();
    document.execCommand('copy');
    if (document.body) document.body.removeChild(el);

    this.setState({ copied: true });

    setTimeout(() => {
      this.setState(() => ({ copied: false }));
    }, 1500);
  };

  render() {
    const { className } = this.props;
    const { copied } = this.state;

    return (
      <div data-testid='Clipboard'>
        <Button
          label={copied ? 'Copied!' : 'Copy'}
          className={className}
          onClick={this.handleClick}
          disabled={copied}
        />
      </div>
    );
  }
}
