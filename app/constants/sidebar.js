// @flow
import DashboardIcon from '../assets/images/dashboard_icon.svg';
import DashboardIconActive from '../assets/images/dashboard_icon_active.svg';
import ConsoleIcon from '../assets/images/console_icon.svg';
import ConsoleIconActive from '../assets/images/console_icon_active.svg';
import SendIcon from '../assets/images/send_icon.svg';
import SendIconActive from '../assets/images/send_icon_active.svg';
import ReceiveIcon from '../assets/images/receive_icon.svg';
import ReceiveIconActive from '../assets/images/receive_icon_active.svg';
import TransactionsIcon from '../assets/images/transactions_icon.svg';
import TransactionsIconActive from '../assets/images/transactions_icon_active.svg';
import SettingsIcon from '../assets/images/settings_icon.svg';
import SettingsIconActive from '../assets/images/settings_icon_active.svg';

import {
  DASHBOARD_ROUTE,
  SEND_ROUTE,
  RECEIVE_ROUTE,
  SETTINGS_ROUTE,
  CONSOLE_ROUTE,
  TRANSACTIONS_ROUTE,
} from './routes';

export const MENU_OPTIONS = [
  {
    label: 'Dashboard',
    route: DASHBOARD_ROUTE,
    icon: (isActive: boolean) => (isActive ? DashboardIconActive : DashboardIcon),
  },
  {
    label: 'Send',
    route: SEND_ROUTE,
    icon: (isActive: boolean) => (isActive ? SendIconActive : SendIcon),
  },
  {
    label: 'Receive',
    route: RECEIVE_ROUTE,
    icon: (isActive: boolean) => (isActive ? ReceiveIconActive : ReceiveIcon),
  },
  {
    label: 'Transactions',
    route: TRANSACTIONS_ROUTE,
    icon: (isActive: boolean) => (isActive ? TransactionsIconActive : TransactionsIcon),
  },
  {
    label: 'Settings',
    route: SETTINGS_ROUTE,
    icon: (isActive: boolean) => (isActive ? SettingsIconActive : SettingsIcon),
  },
  {
    label: 'Console',
    route: CONSOLE_ROUTE,
    icon: (isActive: boolean) => (isActive ? ConsoleIconActive : ConsoleIcon),
  },
];
