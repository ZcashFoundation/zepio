// @flow
import React from 'react';
import { FaThLarge, FaCode } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import { TiDownload } from 'react-icons/ti';
import { MdSettings, MdTransform } from 'react-icons/md';

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
    icon: <FaThLarge />,
  },
  {
    label: 'Console',
    route: CONSOLE_ROUTE,
    icon: <FaCode />,
  },
  {
    label: 'Send',
    route: SEND_ROUTE,
    icon: <IoIosSend />,
  },
  {
    label: 'Receive',
    route: RECEIVE_ROUTE,
    icon: <TiDownload />,
  },
  {
    label: 'Transactions',
    route: TRANSACTIONS_ROUTE,
    icon: <MdTransform />,
  },
  {
    label: 'Settings',
    route: SETTINGS_ROUTE,
    icon: <MdSettings />,
  },
];
