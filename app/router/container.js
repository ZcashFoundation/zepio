// @flow
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { RouterComponent } from './router';

export const Router = compose(withRouter)(RouterComponent);
