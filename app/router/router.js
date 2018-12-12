// @flow

import React from 'react';
import { Route, Switch, type Location } from 'react-router-dom';
import styled from 'styled-components';

import { ScrollTopComponent } from './scroll-top';
import { SidebarContainer } from '../containers/sidebar';
import { DashboardContainer } from '../containers/dashboard';
import { SendView } from '../views/send';
import { ReceiveView } from '../views/receive';
import { SettingsView } from '../views/settings';
import { NotFoundView } from '../views/not-found';
import { ConsoleView } from '../views/console';
import { LayoutComponent } from '../components/layout';

import {
  DASHBOARD_ROUTE, SEND_ROUTE, RECEIVE_ROUTE, SETTINGS_ROUTE, CONSOLE_ROUTE,
} from '../constants/routes';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
`;

export const RouterComponent = ({ location }: { location: Location }) => (
  <Wrapper>
    <SidebarContainer location={location} />
    <ScrollTopComponent>
      {/* $FlowFixMe */}
      <LayoutComponent>
        <Switch>
          <Route exact path={DASHBOARD_ROUTE} component={DashboardContainer} />
          <Route path={SEND_ROUTE} component={SendView} />
          <Route path={RECEIVE_ROUTE} component={ReceiveView} />
          <Route path={SETTINGS_ROUTE} component={SettingsView} />
          <Route path={CONSOLE_ROUTE} component={ConsoleView} />
          <Route component={NotFoundView} />
        </Switch>
      </LayoutComponent>
    </ScrollTopComponent>
  </Wrapper>
);
