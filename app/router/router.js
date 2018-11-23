// @flow

import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ScrollTopComponent } from './scroll-top';
import { SidebarContainer } from '../containers/sidebar';
import { DashboardView } from '../views/dashboard';
import { SendView } from '../views/send';
import { ReceiveView } from '../views/receive';
import { SettingsView } from '../views/settings';
import { NotFoundView } from '../views/not-found';
import {
  DASHBOARD_ROUTE,
  SEND_ROUTE,
  RECEIVE_ROUTE,
  SETTINGS_ROUTE,
} from '../constants/routes';

export const RouterComponent = () => (
  <Fragment>
    <SidebarContainer />
    <ScrollTopComponent>
      <Switch>
        <Route
          path={DASHBOARD_ROUTE}
          exact
          component={DashboardView}
        />
        <Route
          path={SEND_ROUTE}
          component={SendView}
        />
        <Route
          path={RECEIVE_ROUTE}
          component={ReceiveView}
        />
        <Route
          path={SETTINGS_ROUTE}
          component={SettingsView}
        />
        <Route component={NotFoundView} />
      </Switch>
    </ScrollTopComponent>
  </Fragment>
);
