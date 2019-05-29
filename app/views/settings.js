// @flow
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { promisify } from 'util';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import electron from 'electron';
import dateFns from 'date-fns';
import eres from 'eres';

import { Button } from '../components/button';
import { ConfirmDialogComponent } from '../components/confirm-dialog';
import { TextComponent } from '../components/text';
import { InputComponent } from '../components/input';
import { InputLabelComponent } from '../components/input-label';
import { Clipboard } from '../components/clipboard';
import { SelectComponent } from '../components/select';

import rpc from '../../services/api';
import { DARK, LIGHT, THEME_MODE } from '../constants/themes';
import { MAINNET, TESTNET } from '../constants/zcash-network';
import electronStore from '../../config/electron-store';
import { openExternal } from '../utils/open-external';
import { isTestnet } from '../../config/is-testnet';

import type { MapDispatchToProps, MapStateToProps } from '../containers/settings';

const EXPORT_VIEW_KEYS_TITLE = 'Export View Keys';
const EXPORT_VIEW_KEYS_CONTENT = 'Viewing keys for shielded addresses allow for the disclosure of all transaction information to a preffered party. Anyone who holds these keys can see all shielded transaction details, but cannot spend coins as it is not a private key.';
const EXPORT_VIEW_KEYS_LEARN_MORE = 'https://z.cash/blog/viewing-keys-selective-disclosure';
const IMPORT_PRIV_KEYS_TITLE = 'Import Private Keys';
const IMPORT_PRIV_KEYS_CONTENT = 'Importing private keys will add the spendable coins to this wallet.';
const IMPORT_PRIV_KEYS_CONTENT_MODAL = 'Paste your private keys here, one per line. These spending keys will be imported into your wallet.';
const IMPORT_PRIV_KEYS_SUCCESS_CONTENT = 'Private keys imported in your wallet. Any spendable coins should now be available.';
const EXPORT_PRIV_KEYS_TITLE = 'Export Private Keys';
const EXPORT_PRIV_KEYS_CONTENT = 'Beware: exporting your private keys will allow anyone controlling them to spend your coins. Only perform this action on a trusted machine.';
const BACKUP_WALLET_TITLE = 'Backup Wallet';
const BACKUP_WALLET_CONTENT = 'It is recommended that you backup your wallet often to avoid possible issues arising from data corruption.';
const CONFIRM_RELAUNCH_CONTENT = "You'll need to restart the application and the internal full node. Are you sure you want to do this?";
const RUNNING_NON_EMBEDDED_DAEMON_WARNING = 'You are using a separate zcashd process, in order to change the network, you need to restart the process yourself';

const SHIELDED_ADDRESS_PRIVATE_KEY_PREFIX = isTestnet() ? 'secret-extended-key' : 'SK';

const Wrapper = styled.div`
  margin-top: ${props => props.theme.layoutContentPaddingTop};
`;

const ModalContent = styled.div`
  padding: 20px 40px;
  width: 100%;
  max-height: 600px;
  overflow-y: auto;

  p {
    word-break: break-word;
  }
`;

const Btn = styled(Button)`
  margin-bottom: 10px;
`;

const ClipboardButton = styled(Clipboard)`
  width: 50px;
  border-radius: ${props => props.theme.boxBorderRadius};
  height: 45px;
  margin-left: 5px;
`;

const SettingsWrapper = styled.div`
  min-width: 200px;
  width: 70%;
  max-width: 600px;
  min-width: 350px;
  background: ${props => props.theme.colors.settingsCardBg};
  padding: 20px 20px 10px 20px;
  border: 1px solid ${props => props.theme.colors.inputBorder};
  border-radius: ${props => props.theme.boxBorderRadius};
`;

const SettingsInnerWrapper = styled.div`
  margin-bottom: 50px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const LearnMore = styled.div`
  cursor: pointer;
  text-transform: uppercase;
  font-size: 10px;
  font-family: ${props => props.theme.fontFamily};;
  letter-spacing: 1px;
  color: ${props => props.theme.colors.settingsLearnMore};

  &:hover {
    color: ${props => props.theme.colors.settingsLearnMoreHovered};;
  }
}
`;

const SettingsTitle = styled(TextComponent)`
  text-transform: uppercase;
  color: ${props => props.theme.colors.transactionsDate};
  font-size: ${props => `${props.theme.fontSize.regular * 0.9}em`};
  font-weight: ${props => String(props.theme.fontWeight.bold)};
  margin-bottom: 5px;
`;

const SettingsContent = styled(TextComponent)`
  margin-bottom: 30px;
  margin-top: 15px;
  font-weight: 300;
  letter-spacing: 0.5px;
  line-height: 1.4;
`;

const ThemeSelectWrapper = styled.div`
  margin-bottom: 20px;
  width: 70%;
  max-width: 600px;
  min-width: 350px;
`;

const SettingsActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StatusWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StatusTextError = styled(TextComponent)`
  font-weight: 700;
  color: ${props => props.theme.colors.error};
`;

const StatusTextSuccess = styled(TextComponent)`
  font-weight: 700;
  color: ${props => props.theme.colors.success};
`;

const ViewKeyHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0 10px 0;
`;

const ViewKeyLabel = styled(TextComponent)`
  font-weight: ${props => String(props.theme.fontWeight.bold)};
  font-size: ${props => String(props.theme.fontSize.small)};
  color: ${props => props.theme.colors.modalItemLabel};
  margin-bottom: 3.5px;
`;

const ViewKeyAddress = styled(TextComponent)`
  font-size: 12px;
  padding: 10px 0;
  line-height: 1.5;
  word-break: break-all !important;
`;

const ViewKeyContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  > :first-child {
    width: 100%;
  }
`;

const ViewKeyInputComponent = styled(InputComponent)`
  font-size: 12px;
`;

type Key = {
  zAddress: string,
  key: string,
};

type Props = MapDispatchToProps & MapStateToProps;

type State = {
  viewKeys: Key[],
  privateKeys: Key[],
  importedPrivateKeys: string,
  successExportViewKeys: boolean,
  successExportPrivateKeys: boolean,
  successImportPrivateKeys: boolean,
  isLoading: boolean,
  error: string | null,
};

const initialState = {
  viewKeys: [],
  privateKeys: [],
  importedPrivateKeys: '',
  isLoading: false,
  successExportViewKeys: false,
  successExportPrivateKeys: false,
  successImportPrivateKeys: false,
  error: null,
};

export class SettingsView extends PureComponent<Props, State> {
  state = initialState;

  componentDidMount() {
    const { loadAddresses } = this.props;

    loadAddresses();
  }

  resetState = () => {
    this.setState(initialState);
  };

  getWalletFolderPath = () => {
    const { app } = electron.remote;

    if (os.platform() === 'darwin') {
      return path.join(app.getPath('appData'), 'Zcash');
    }

    if (os.platform() === 'linux') {
      return path.join(app.getPath('home'), '.zcash');
    }

    return path.join(app.getPath('appData'), 'Zcash');
  };

  exportViewKeys = () => {
    const { addresses } = this.props;

    const zAddresses = addresses.filter(({ address }) => address.startsWith('z'));

    this.setState({ isLoading: true });

    Promise.all(
      zAddresses.map(async ({ address }) => {
        const viewKey = await rpc.z_exportviewingkey(address);
        return { zAddress: address, key: viewKey };
      }),
    ).then((viewKeys) => {
      this.setState({
        viewKeys,
        successExportViewKeys: true,
        isLoading: false,
      });
    });
  };

  exportPrivateKeys = async () => {
    const { addresses } = this.props;

    this.setState({ isLoading: true });

    const privateKeys = await Promise.all(
      addresses.map(async ({ address }) => {
        const [error, privateKey] = await eres(
          address.startsWith('z') ? rpc.z_exportkey(address) : rpc.dumpprivkey(address),
        );

        if (error || !privateKey) return null;

        return { zAddress: address, key: privateKey };
      }),
    );

    this.setState({
      // $FlowFixMe
      privateKeys: privateKeys.filter(Boolean),
      successExportPrivateKeys: true,
      isLoading: false,
    });
  };

  importPrivateKeys = () => {
    const { importedPrivateKeys } = this.state;

    if (!importedPrivateKeys) return;

    const keys = importedPrivateKeys
      .split('\n')
      .map(key => key.trim())
      .filter(key => !!key);

    this.setState({ isLoading: true, error: null });

    Promise.all(
      keys.map(key => (key.startsWith(SHIELDED_ADDRESS_PRIVATE_KEY_PREFIX)
        ? rpc.z_importkey(key)
        : rpc.importprivkey(key))),
    )
      .then(() => {
        this.setState({
          successImportPrivateKeys: true,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false, error: error.message });
      });
  };

  backupWalletDat = async () => {
    const backupFileName = `zcash-wallet-backup-${dateFns.format(
      new Date(),
      'YYYY-MM-DD-mm-ss',
    )}.dat`;

    electron.remote.dialog.showSaveDialog(
      undefined,
      { defaultPath: backupFileName },
      async (pathToSave: string) => {
        if (!pathToSave) return;

        const WALLET_DIR = this.getWalletFolderPath();

        const zcashDir = isTestnet() ? path.join(WALLET_DIR, 'testnet3') : WALLET_DIR;
        const walletDatPath = `${zcashDir}/wallet.dat`;

        const [cannotAccess] = await eres(promisify(fs.access)(walletDatPath));

        /* eslint-disable no-alert */
        if (cannotAccess) {
          alert("Couldn't backup the wallet.dat file. You need to back it up manually.");
          return;
        }

        const [error] = await eres(promisify(fs.copyFile)(walletDatPath, pathToSave));

        if (error) {
          alert("Couldn't backup the wallet.dat file. You need to back it up manually.");
        }
      },
    );
  };

  render = () => {
    const {
      viewKeys,
      privateKeys,
      importedPrivateKeys,
      successExportViewKeys,
      successExportPrivateKeys,
      successImportPrivateKeys,
      isLoading,
      error,
    } = this.state;

    const { zcashNetwork, updateZcashNetwork, embeddedDaemon } = this.props;

    const themeOptions = [{ label: 'Dark', value: DARK }, { label: 'Light', value: LIGHT }];

    const networkOptions = [
      { label: 'Mainnet', value: MAINNET },
      { label: 'Testnet', value: TESTNET },
    ];

    return (
      <Wrapper>
        {embeddedDaemon && (
          <ConfirmDialogComponent
            title='Confirm'
            onConfirm={() => updateZcashNetwork(zcashNetwork === MAINNET ? TESTNET : MAINNET)}
            showButtons={embeddedDaemon}
            renderTrigger={toggleVisibility => (
              <ThemeSelectWrapper>
                <SettingsTitle value='Zcash Network' />
                <SelectComponent
                  onChange={value => (zcashNetwork !== value ? toggleVisibility() : undefined)}
                  value={zcashNetwork}
                  options={networkOptions}
                />
              </ThemeSelectWrapper>
            )}
          >
            {() => (
              <ModalContent>
                <TextComponent
                  value={
                    embeddedDaemon ? CONFIRM_RELAUNCH_CONTENT : RUNNING_NON_EMBEDDED_DAEMON_WARNING
                  }
                />
              </ModalContent>
            )}
          </ConfirmDialogComponent>
        )}
        <ThemeSelectWrapper>
          <SettingsTitle value='Theme' />
          <SelectComponent
            onChange={newMode => electronStore.set(THEME_MODE, newMode)}
            value={electronStore.get(THEME_MODE)}
            options={themeOptions}
          />
        </ThemeSelectWrapper>
        {/* Hidden due to Sapling inability to export view keys on sapling addresses yet */}
        {/* <ConfirmDialogComponent
          title={EXPORT_VIEW_KEYS_TITLE}
          renderTrigger={toggleVisibility => (
            <SettingsWrapper>
              <SettingsTitle value={EXPORT_VIEW_KEYS_TITLE} />
              <SettingsContent value={EXPORT_VIEW_KEYS_CONTENT} />
              <SettingsActionWrapper>
                <Btn label={EXPORT_VIEW_KEYS_TITLE} onClick={toggleVisibility} />
                <LearnMore onClick={() => openExternal(EXPORT_VIEW_KEYS_LEARN_MORE)}>
                  Learn More
                </LearnMore>
              </SettingsActionWrapper>
            </SettingsWrapper>
          )}
          onConfirm={this.exportViewKeys}
          showButtons={!successExportViewKeys}
          width={550}
        >
          {() => (
            <ModalContent>
              {successExportViewKeys ? (
                viewKeys.map(({ zAddress, key }, index) => (
                  <>
                    <ViewKeyHeader>
                      <ViewKeyLabel value={`View Key for Address #${index + 1}`} />
                      <ViewKeyAddress value={`Address: ${zAddress}`} />
                    </ViewKeyHeader>
                    <ViewKeyContentWrapper>
                      <ViewKeyInputComponent
                        value={key}
                        onFocus={event => event.currentTarget.select()}
                      />
                      <ClipboardButton text={key} />
                    </ViewKeyContentWrapper>
                  </>
                ))
              ) : (
                <TextComponent value={EXPORT_VIEW_KEYS_CONTENT} />
              )}
            </ModalContent>
          )}
        </ConfirmDialogComponent> */}

        <SettingsWrapper>
          <ConfirmDialogComponent
            title={EXPORT_PRIV_KEYS_TITLE}
            renderTrigger={toggleVisibility => (
              <SettingsInnerWrapper>
                <SettingsTitle value={EXPORT_PRIV_KEYS_TITLE} />
                <SettingsContent value={EXPORT_PRIV_KEYS_CONTENT} />
                <Btn label={EXPORT_PRIV_KEYS_TITLE} onClick={toggleVisibility} />
              </SettingsInnerWrapper>
            )}
            onConfirm={() => {
              this.exportPrivateKeys();
            }}
            showButtons={!successExportPrivateKeys}
            width={550}
            onClose={this.resetState}
          >
            {() => (
              <ModalContent>
                {successExportPrivateKeys ? (
                  privateKeys.map(({ zAddress, key }, index) => (
                    <div key={zAddress}>
                      <ViewKeyHeader>
                        <ViewKeyLabel value={`Private Key for Address #${index + 1}`} />
                        <ViewKeyAddress value={`Address: ${zAddress}`} />
                      </ViewKeyHeader>
                      <ViewKeyContentWrapper>
                        <ViewKeyInputComponent
                          value={key}
                          width='100%'
                          onFocus={event => event.currentTarget.select()}
                        />
                        <ClipboardButton text={key} />
                      </ViewKeyContentWrapper>
                    </div>
                  ))
                ) : (
                  <TextComponent value={EXPORT_PRIV_KEYS_CONTENT} />
                )}
              </ModalContent>
            )}
          </ConfirmDialogComponent>
          <ConfirmDialogComponent
            title={IMPORT_PRIV_KEYS_TITLE}
            renderTrigger={toggleVisibility => (
              <SettingsInnerWrapper>
                <SettingsTitle value={IMPORT_PRIV_KEYS_TITLE} />
                <SettingsContent value={IMPORT_PRIV_KEYS_CONTENT} />
                <Btn label={IMPORT_PRIV_KEYS_TITLE} onClick={toggleVisibility} />
              </SettingsInnerWrapper>
            )}
            onConfirm={this.importPrivateKeys}
            showButtons={!successImportPrivateKeys}
            width={450}
            isLoading={isLoading}
          >
            {() => (
              <ModalContent>
                <InputLabelComponent marginTop='0' value={IMPORT_PRIV_KEYS_CONTENT_MODAL} />
                <InputComponent
                  value={importedPrivateKeys}
                  onChange={value => this.setState({ importedPrivateKeys: value })}
                  inputType='textarea'
                  rows={10}
                />
                <StatusWrapper>
                  {successImportPrivateKeys && (
                    <StatusTextSuccess value={IMPORT_PRIV_KEYS_SUCCESS_CONTENT} />
                  )}
                  {error && <StatusTextError value={error} align='center' />}
                </StatusWrapper>
              </ModalContent>
            )}
          </ConfirmDialogComponent>
        </SettingsWrapper>

        <SettingsWrapper>
          <SettingsTitle value={BACKUP_WALLET_TITLE} />
          <SettingsContent value={BACKUP_WALLET_CONTENT} />
          <Btn label={BACKUP_WALLET_TITLE} onClick={this.backupWalletDat} />
        </SettingsWrapper>
      </Wrapper>
    );
  };
}
