// @flow

import { openExternal } from './utils/open-external';
import packageJson from '../package.json';

const DOCS_URL = 'https://zepiowallet.com/';
const REPOSITORY_URL = 'https://github.com/ZcashFoundation/zepio/issues';

const menu = [
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'delete' },
      { role: 'selectall' },
    ],
  },
  {
    label: 'View',
    submenu: [
      { role: 'togglefullscreen' },
    ],
  },
];

const helpMenu = {
  role: 'help',
  submenu: [
    {
      label: `Zepio Version v${packageJson.version}`,
      enabled: false,
    },
    { type: 'separator' },
    {
      label: 'Help / FAQ',
      click() {
        openExternal(DOCS_URL);
      },
    },
    {
      label: 'Search Issues',
      click() {
        openExternal(REPOSITORY_URL);
      },
    },
  ],
};

if (process.platform === 'darwin') {
  menu.unshift({
    label: packageJson.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' },
    ],
  });

  menu.push({
    ...helpMenu,
    submenu: [
      ...helpMenu.submenu,
    ],
  });
} else {
  menu.push(helpMenu);
}

export const MENU = menu;
