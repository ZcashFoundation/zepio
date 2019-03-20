// @flow

import { connect } from 'react-redux';

import { SidebarComponent } from '../components/sidebar';

import type { AppState } from '../types/app-state';

export type MapStateToProps = {|
  zcashNetwork: string,
  embeddedDaemon: boolean,
|};

const mapStateToProps = ({ app }: AppState): MapStateToProps => ({
  zcashNetwork: app.zcashNetwork,
  embeddedDaemon: app.embeddedDaemon,
});

// $FlowFixMe
export const SidebarContainer = connect(
  mapStateToProps,
)(SidebarComponent);
