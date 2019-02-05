// @flow

import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { RouterComponent } from './router';
import { withDaemonStatusCheck } from '../components/with-daemon-status-check';

export const Router = compose(
  withRouter,
  withDaemonStatusCheck,
)(RouterComponent);
