// @flow

import DashboardIconDark from '../assets/images/dashboard_icon_dark.svg';
import DashboardIconLight from '../assets/images/dashboard_icon_light.svg';
import DashboardIconActive from '../assets/images/dashboard_icon_active.svg';
import ConsoleIconDark from '../assets/images/console_icon_dark.svg';
import ConsoleIconLight from '../assets/images/console_icon_light.svg';
import ConsoleIconActive from '../assets/images/console_icon_active.svg';
import SendIconDark from '../assets/images/send_icon_dark.svg';
import SendIconLight from '../assets/images/send_icon_light.svg';
import SendIconActive from '../assets/images/send_icon_active.svg';
import ReceiveIconDark from '../assets/images/receive_icon_dark.svg';
import ReceiveIconLight from '../assets/images/receive_icon_light.svg';
import ReceiveIconActive from '../assets/images/receive_icon_active.svg';
import TransactionsIconDark from '../assets/images/transactions_icon_dark.svg';
import TransactionsIconLight from '../assets/images/transactions_icon_light.svg';
import TransactionsIconActive from '../assets/images/transactions_icon_active.svg';
import SettingsIconDark from '../assets/images/settings_icon_dark.svg';
import SettingsIconLight from '../assets/images/settings_icon_light.svg';
import SettingsIconActive from '../assets/images/settings_icon_active.svg';

import {
  DASHBOARD_ROUTE,
  SEND_ROUTE,
  RECEIVE_ROUTE,
  SETTINGS_ROUTE,
  CONSOLE_ROUTE,
  TRANSACTIONS_ROUTE,
} from './routes';
import { LIGHT } from './themes';

export const MENU_OPTIONS = [
  {
    label: 'Dashboard',
    route: DASHBOARD_ROUTE,
    icon: (isActive: boolean, themeMode: string) => {
      if (themeMode === LIGHT) {
        return DashboardIconLight;
      }

      return (isActive) ? DashboardIconActive : DashboardIconDark;
    },
  },
  {
    label: 'Send',
    route: SEND_ROUTE,
    icon: (isActive: boolean, themeMode: string) => {
      if (themeMode === LIGHT) {
        return SendIconLight;
      }

      return (isActive) ? SendIconActive : SendIconDark;
    },
  },
  {
    label: 'Receive',
    route: RECEIVE_ROUTE,
    icon: (isActive: boolean, themeMode: string) => {
      if (themeMode === LIGHT) {
        return ReceiveIconLight;
      }

      return (isActive) ? ReceiveIconActive : ReceiveIconDark;
    },
  },
  {
    label: 'Transactions',
    route: TRANSACTIONS_ROUTE,
    icon: (isActive: boolean, themeMode: string) => {
      if (themeMode === LIGHT) {
        return TransactionsIconLight;
      }

      return (isActive) ? TransactionsIconActive : TransactionsIconDark;
    },
  },
  {
    label: 'Settings',
    route: SETTINGS_ROUTE,
    icon: (isActive: boolean, themeMode: string) => {
      if (themeMode === LIGHT) {
        return SettingsIconLight;
      }

      return (isActive) ? SettingsIconActive : SettingsIconDark;
    },
  },
  {
    label: 'Console',
    route: CONSOLE_ROUTE,
    icon: (isActive: boolean, themeMode: string) => {
      if (themeMode === LIGHT) {
        return ConsoleIconLight;
      }

      return (isActive) ? ConsoleIconActive : ConsoleIconDark;
    },
  },
];
