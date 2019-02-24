// @flow

import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { RouterComponent } from './router';
import { withDaemonStatusCheck } from '../components/with-daemon-status-check';
import { withDeepLink } from '../components/with-deeplink';

export const Router = compose(
  withRouter,
  withDaemonStatusCheck,
  withDeepLink,
)(RouterComponent);
