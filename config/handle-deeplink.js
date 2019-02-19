// @flow
import { typeof app as ElectronApp, type electron$BrowserWindow, remote } from 'electron'; // eslint-disable-line
import store from './electron-store';

const sendMessage = (mainWindow, url) => {
  if (mainWindow) {
    if (mainWindow.isVisible()) {
      mainWindow.webContents.send('on-deep-link', url);
    } else {
      mainWindow.on('show', () => mainWindow.webContents.send('on-deep-link', url));
    }
  }
};

export const searchUriInArgv = (argv: string[]): ?string => {
  const argIndex = argv.findIndex(item => /zcash:(\/\/)?/.test(item));
  return argv[argIndex];
};

export const handleDeeplink = ({
  app,
  mainWindow,
  argv = process.argv,
  listenOpenUrl = true,
}: {
  app: ElectronApp,
  mainWindow: electron$BrowserWindow,
  argv?: string[],
  listenOpenUrl?: boolean,
}) => {
  if (listenOpenUrl) {
    app.on('open-url', (event: Object, url: string) => {
      event.preventDefault();
      // Save the url on electron-store, so we can get the value on withDeeplink HOC
      store.set('OSX_DEEPLINK_URL', url);
      sendMessage(mainWindow, url);
    });
  }

  if (process.platform === 'win32' || process.platform === 'linux') {
    const arg = searchUriInArgv(argv);

    if (arg) {
      sendMessage(mainWindow, arg);
    }
  }
};
