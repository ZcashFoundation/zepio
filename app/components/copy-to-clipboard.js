// @flow

import React, { PureComponent } from 'react';
import copy from 'copy-to-clipboard';

type Props = {
  text: string,
  children: any,
  onCopy?: Function,
  options?: Object,
}

export class CopyToClipboard extends PureComponent<Props> {
  static defaultProps = {
    onCopy: () => {},
    options: {},
  };


  onClick = (event: Object) => {
    const {
      text,
      onCopy,
      children,
      options,
    } = this.props;

    const elem = React.Children.only(children);

    const result = copy(text, options);

    if (onCopy) {
      onCopy(text, result);
    }

    // Bypass onClick if it was present
    if (
      elem
      && elem.props
      && typeof elem.props.onClick === 'function'
    ) {
      elem.props.onClick(event);
    }
  };

  render() {
    const {
      text: _text,
      onCopy: _onCopy,
      options: _options,
      children,
      ...props
    } = this.props;
    const elem = React.Children.only(children);

    return React.cloneElement(
      elem,
      { ...props, onClick: this.onClick },
    );
  }
}
