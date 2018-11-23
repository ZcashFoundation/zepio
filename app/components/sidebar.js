// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { MENU_OPTIONS } from '../constants/sidebar';

export const SidebarComponent = () => (
  <div>
    {MENU_OPTIONS.map(item => (
      <Link
        key={item.route}
        to={item.route}
      >
        {item.label}
      </Link>
    ))}
  </div>
);
