// @flow

/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import { promisify } from 'util';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import electron from 'electron';
import isDev from 'electron-is-dev';
import dateFns from 'date-fns';
import eres from 'eres';

import { Button } from '../components/button';
import { ConfirmDialogComponent } from '../components/confirm-dialog';
import { TextComponent } from '../components/text';
import { InputComponent } from '../components/input';
import { InputLabelComponent } from '../components/input-label';
import { RowComponent } from '../components/row';
import { Clipboard } from '../components/clipboard';
import { SelectComponent } from '../components/select';

import rpc from '../../services/api';
import { DARK, LIGHT, THEME_MODE } from '../constants/themes';
import electronStore from '../../config/electron-store';
import { openExternal } from '../utils/open-external';

const HOME_DIR = electron.remote.app.getPath('home');

const EXPORT_VIEW_KEYS_TITLE = 'Export View Keys';
const EXPORT_VIEW_KEYS_CONTENT = 'Viewing keys for shielded addresses allow for the disclosure of all transaction information to a preffered party. Anyone who holds these keys can see all shielded transaction details, but cannot spend coins as it is not a private key.';
const EXPORT_VIEW_KEYS_LEARN_MORE = 'https://z.cash/blog/viewing-keys-selective-disclosure';
const IMPORT_PRIV_KEYS_TITLE = 'Import Private Keys';
const IMPORT_PRIV_KEYS_CONTENT = 'Importing private keys will add the spendable coins to this wallet.';
const EXPORT_PRIV_KEYS_TITLE = 'Export Private Keys';
const EXPORT_PRIV_KEYS_CONTENT = 'Beware: exporting your private keys will allow anyone controlling them to spend your coins. Only perform this action on a trusted machine.';
const BACKUP_WALLET_TITLE = 'Backup Wallet';
const BACKUP_WALLET_CONTENT = 'It is recommended that you backup your wallet often.';

const Wrapper = styled.div`
  margin-top: ${props => props.theme.layoutContentPaddingTop};
`;

const ModalContent = styled.div`
  padding: 20px 30px;
  width: 100%;
  max-height: 600px;
  overflow-y: auto;

  p {
    word-break: break-all;
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
  margin-bottom: 20px;
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
  font-family: Roboto;
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

type Key = {
  zAddress: string,
  key: string,
};

type Props = {
  addresses: string[],
};
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

export class SettingsView extends PureComponent<Props, State> {
  state = {
    viewKeys: [],
    privateKeys: [],
    importedPrivateKeys: '',
    isLoading: false,
    successExportViewKeys: false,
    successExportPrivateKeys: false,
    successImportPrivateKeys: false,
    error: null,
  };

  exportViewKeys = () => {
    const { addresses } = this.props;

    const zAddresses = addresses.filter(addr => addr.startsWith('z'));

    this.setState({ isLoading: true });

    Promise.all(
      zAddresses.map(async (zAddr) => {
        const viewKey = await rpc.z_exportviewingkey(zAddr);
        return { zAddress: zAddr, key: viewKey };
      }),
    ).then((viewKeys) => {
      this.setState({
        viewKeys,
        successExportViewKeys: true,
        isLoading: false,
      });
    });
  };

  exportPrivateKeys = () => {
    const { addresses } = this.props;

    const zAddresses = addresses.filter(addr => addr.startsWith('z'));

    this.setState({ isLoading: true });

    Promise.all(
      zAddresses.map(async (zAddr) => {
        const privateKey = await rpc.z_exportkey(zAddr);
        return { zAddress: zAddr, key: privateKey };
      }),
    ).then((privateKeys) => {
      this.setState({
        privateKeys,
        successExportPrivateKeys: true,
        isLoading: false,
      });
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

    Promise.all(keys.map(key => rpc.z_importkey(key)))
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

        const zcashDir = isDev ? `${HOME_DIR}/.zcash/testnet3` : HOME_DIR;
        const walletDatPath = `${zcashDir}/wallet.dat`;

        const [cannotAccess] = await eres(promisify(fs.access)(walletDatPath));

        /* eslint-disable no-alert */

        if (cannotAccess) {
          alert("Couldn't backup the wallet.dat file. You need to back it up manually.");
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

    const themeOptions = [
      { label: 'Dark', value: DARK },
      { label: 'Light', value: LIGHT },
    ];

    return (
      <Wrapper>
        <ThemeSelectWrapper>
          <SettingsTitle value='Theme' />
          <SelectComponent
            onChange={newMode => electronStore.set(THEME_MODE, newMode)}
            value={electronStore.get(THEME_MODE)}
            options={themeOptions}
          />
        </ThemeSelectWrapper>
        <ConfirmDialogComponent
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
          width={450}
        >
          {() => (
            <ModalContent>
              {successExportViewKeys ? (
                viewKeys.map(({ zAddress, key }) => (
                  <>
                    <InputLabelComponent value={zAddress} />
                    <RowComponent alignItems='center'>
                      <InputComponent
                        value={key}
                        onFocus={(event) => {
                          event.currentTarget.select();
                        }}
                      />
                      <ClipboardButton text={key} />
                    </RowComponent>
                  </>
                ))
              ) : (
                <TextComponent value='Ut id vulputate arcu. Curabitur mattis aliquam magna sollicitudin vulputate. Morbi tempus bibendum porttitor. Quisque dictum ac ipsum a luctus. Donec et lacus ac erat consectetur molestie a id erat.' />
              )}
            </ModalContent>
          )}
        </ConfirmDialogComponent>

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
            onConfirm={this.exportPrivateKeys}
            showButtons={!successExportPrivateKeys}
            width={450}
          >
            {() => (
              <ModalContent>
                {successExportPrivateKeys ? (
                  privateKeys.map(({ zAddress, key }) => (
                    <>
                      <InputLabelComponent value={zAddress} />
                      <RowComponent alignItems='center'>
                        <InputComponent
                          value={key}
                          onFocus={(event) => {
                            event.currentTarget.select();
                          }}
                        />
                        <ClipboardButton text={key} />
                      </RowComponent>
                    </>
                  ))
                ) : (
                  <TextComponent value='Ut id vulputate arcu. Curabitur mattis aliquam magna sollicitudin vulputate. Morbi tempus bibendum porttitor. Quisque dictum ac ipsum a luctus. Donec et lacus ac erat consectetur molestie a id erat.' />
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
                <InputLabelComponent value='Please paste your private keys here, one per line. The keys will be imported into your zcashd node' />
                <InputComponent
                  value={importedPrivateKeys}
                  onChange={value => this.setState({ importedPrivateKeys: value })}
                  inputType='textarea'
                  rows={10}
                />
                {successImportPrivateKeys && (
                  <TextComponent value='Private keys imported in your node' align='center' />
                )}
                {error && <TextComponent value={error} align='center' />}
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
