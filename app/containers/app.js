// @flow
import { connect } from 'react-redux';
import { closeErrorModal } from '../redux/modules/app';

import { LayoutComponent } from '../components/layout';

import type { Dispatch } from '../types/redux';
import type { AppState } from '../types/app-state';

const mapStateToProps = ({ app }: AppState) => ({
  isErrorModalVisible: app.isErrorModalVisible,
  error: app.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeErrorModal: () => dispatch(closeErrorModal()),
});

// $FlowFixMe
export const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LayoutComponent);
