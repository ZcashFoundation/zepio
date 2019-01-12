// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Button } from '../components/button';
import { ConfirmDialogComponent } from '../components/confirm-dialog';
import { TextComponent } from '../components/text';
import { InputComponent } from '../components/input';
import { InputLabelComponent } from '../components/input-label';
import { RowComponent } from '../components/row';
import { Clipboard } from '../components/clipboard';

import rpc from '../../services/api';

const Wrapper = styled.div`
  margin-top: ${props => props.theme.layoutContentPaddingTop};
`;

const ModalContent = styled.div`
  padding: 20px;
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
  isLoading: boolean,
  successExportViewKeys: boolean,
  successExportPrivateKeys: boolean,
};

export class SettingsView extends PureComponent<Props, State> {
  state = {
    viewKeys: [],
    privateKeys: [],
    isLoading: false,
    successExportViewKeys: false,
    successExportPrivateKeys: false,
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

  render = () => {
    const {
      viewKeys,
      isLoading,
      successExportViewKeys,
      privateKeys,
      successExportPrivateKeys,
    } = this.state;

    return (
      <Wrapper>
        <ConfirmDialogComponent
          title='Export view keys'
          renderTrigger={toggleVisibility => (
            <Btn label='Export view keys' onClick={toggleVisibility} />
          )}
          onConfirm={this.exportViewKeys}
          showButtons={!successExportViewKeys}
          width={750}
        >
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
              <TextComponent
                value={
                  isLoading
                    ? 'Loading...'
                    : 'Ut id vulputate arcu. Curabitur mattis aliquam magna sollicitudin vulputate. Morbi tempus bibendum porttitor. Quisque dictum ac ipsum a luctus. Donec et lacus ac erat consectetur molestie a id erat.'
                }
              />
            )}
          </ModalContent>
        </ConfirmDialogComponent>

        <ConfirmDialogComponent
          title='Export private keys'
          renderTrigger={toggleVisibility => (
            <Btn label='Export private keys' onClick={toggleVisibility} />
          )}
          onConfirm={this.exportPrivateKeys}
          showButtons={!successExportPrivateKeys}
          width={750}
        >
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
              <TextComponent
                value={
                  isLoading
                    ? 'Loading...'
                    : 'Ut id vulputate arcu. Curabitur mattis aliquam magna sollicitudin vulputate. Morbi tempus bibendum porttitor. Quisque dictum ac ipsum a luctus. Donec et lacus ac erat consectetur molestie a id erat.'
                }
              />
            )}
          </ModalContent>
        </ConfirmDialogComponent>
      </Wrapper>
    );
  };
}
