// @flow

import { openExternal } from './utils/open-external';
import packageJson from '../package.json';

const DOCS_URL = 'https://zepiowallet.com/';
const REPOSITORY_URL = 'https://github.com/ZcashFoundation/zepio/issues/new';

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
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' },
    ],
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { role: 'togglefullscreen' },
      { type: 'separator' },
      { role: 'toggledevtools' },
    ],
  },
];

const helpMenu = {
  role: 'help',
  submenu: [
    {
      label: `v${packageJson.version}`,
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
      label: 'Report a Bug',
      click() {
        openExternal(REPOSITORY_URL);
      },
    },
  ],
};

if (process.platform === 'darwin') {
  menu.unshift({
    label: 'Zepio',
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
      {
        label: 'Speech',
        submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }],
      },
    ],
  });
} else {
  menu.push(helpMenu);
}

export const MENU = menu;
