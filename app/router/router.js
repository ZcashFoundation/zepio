// @flow

import React from 'react';
import {
  Route, Switch, type Location, type RouterHistory,
} from 'react-router-dom';
import styled from 'styled-components';

import { ScrollTopComponent } from './scroll-top';
import { SidebarContainer } from '../containers/sidebar';
import { DashboardContainer } from '../containers/dashboard';
import { TransactionsContainer } from '../containers/transactions';
import { SendContainer } from '../containers/send';
import { ReceiveContainer } from '../containers/receive';
import { SettingsContainer } from '../containers/settings';
import { NotFoundView } from '../views/not-found';
import { ConsoleView } from '../views/console';
import { AppContainer as LayoutComponent } from '../containers/app';
import { HeaderComponent } from '../components/header';

import {
  DASHBOARD_ROUTE,
  SEND_ROUTE,
  RECEIVE_ROUTE,
  SETTINGS_ROUTE,
  CONSOLE_ROUTE,
  TRANSACTIONS_ROUTE,
} from '../constants/routes';

const FullWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
`;

const getTitle = (path: string) => {
  if (path === '/') return 'Dashboard';

  return path.split('/')[1];
};

export const RouterComponent = ({
  location,
  history,
}: {
  location: Location,
  history: RouterHistory,
}) => (
  <FullWrapper>
    <HeaderComponent title={getTitle(location.pathname)} />
    <ContentWrapper>
      <SidebarContainer location={location} history={history} />
      <LayoutComponent>
        <ScrollTopComponent>
          <Switch>
            <Route exact path={DASHBOARD_ROUTE} component={DashboardContainer} />
            <Route path={`${SEND_ROUTE}/:to?`} component={SendContainer} />
            <Route path={RECEIVE_ROUTE} component={ReceiveContainer} />
            <Route path={SETTINGS_ROUTE} component={SettingsContainer} />
            <Route path={CONSOLE_ROUTE} component={ConsoleView} />
            <Route path={TRANSACTIONS_ROUTE} component={TransactionsContainer} />
            <Route component={NotFoundView} />
          </Switch>
        </ScrollTopComponent>
      </LayoutComponent>
    </ContentWrapper>
  </FullWrapper>
);
