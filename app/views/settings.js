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

const HOME_DIR = electron.remote.app.getPath('home');

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
  margin-bottom: 45px;
  min-width: 200px;
  width: 37%;
`;

const SettingsTitle = styled(TextComponent)`
  text-transform: uppercase;
  color: ${props => props.theme.colors.transactionsDate};
  font-size: ${props => `${props.theme.fontSize.regular * 0.9}em`};
  font-weight: ${props => String(props.theme.fontWeight.bold)};
  margin-bottom: 5px;
`;

const SettingsContent = styled(TextComponent)`
  margin-bottom: 20px;
  margin-top: 10px;
`;

const ThemeSelectWrapper = styled.div`
  margin-bottom: 20px;
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
          title='Export View Keys'
          renderTrigger={toggleVisibility => (
            <SettingsWrapper>
              <SettingsTitle value='Export View Keys' />
              <SettingsContent value='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.' />
              <Btn label='Export View Keys' onClick={toggleVisibility} />
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

        <ConfirmDialogComponent
          title='Export Private Keys'
          renderTrigger={toggleVisibility => (
            <SettingsWrapper>
              <SettingsTitle value='Export Private Keys' />
              <SettingsContent value='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.' />
              <Btn label='Export Private Keys' onClick={toggleVisibility} />
            </SettingsWrapper>
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
          title='Import Private Keys'
          renderTrigger={toggleVisibility => (
            <SettingsWrapper>
              <SettingsTitle value='Import Private Keys' />
              <SettingsContent value='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.' />
              <Btn label='Import Private Keys' onClick={toggleVisibility} />
            </SettingsWrapper>
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

        <SettingsWrapper>
          <SettingsTitle value='Backup Wallet' />
          <SettingsContent value='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.' />
          <Btn label='Backup Wallet' onClick={this.backupWalletDat} />
        </SettingsWrapper>
      </Wrapper>
    );
  };
}
