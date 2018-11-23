// @flow

import {
  DASHBOARD_ROUTE,
  SEND_ROUTE,
  RECEIVE_ROUTE,
  SETTINGS_ROUTE,
} from './routes';

export const MENU_OPTIONS = [
  {
    label: 'Dashboard',
    route: DASHBOARD_ROUTE,
  },
  {
    label: 'Send',
    route: SEND_ROUTE,
  },
  {
    label: 'Receive',
    route: RECEIVE_ROUTE,
  },
  {
    label: 'Settings',
    route: SETTINGS_ROUTE,
  },
];
