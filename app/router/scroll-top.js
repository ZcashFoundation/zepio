// @flow

import { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

type Props = {
  location: Object,
  children: any,
};

class ScrollTop extends PureComponent<Props> {
  componentDidUpdate(prevProps: Props) {
    const { location } = this.props;

    if (location !== prevProps.location) window.scrollTo(0, 0);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export const ScrollTopComponent = withRouter(ScrollTop);
