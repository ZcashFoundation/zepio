// @flow
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { RouterComponent } from './router';
import type { AppState } from '../types/app-state';

const mapStateToProps = (state: AppState) => ({
  todos: state.todos,
});

export const Router = compose(
  withRouter,
  connect(
    mapStateToProps,
    null,
  ),
)(RouterComponent);
