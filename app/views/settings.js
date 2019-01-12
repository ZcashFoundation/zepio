// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Button } from '../components/button';
import { ModalComponent } from '../components/modal';
import { ConfirmDialogComponent } from '../components/confirm-dialog';
import { TextComponent } from '../components/text';
import { InputComponent } from '../components/input';

import rpc from '../../services/api';

const Wrapper = styled.div`
  margin-top: ${props => props.theme.layoutContentPaddingTop};
`;

const ModalContent = styled.div`
  padding: 20px;
  width: 100%;
  overflow-x: hidden;
`;

type ViewKey = {
  zAddress: string,
  key: string,
};

type Props = {
  addresses: string[],
};
type State = {
  viewKeys: ViewKey[],
  isLoading: boolean,
  successExportViewKeys: boolean,
  message: string | null,
};

export class SettingsView extends PureComponent<Props, State> {
  state = {
    viewKeys: [],
    isLoading: false,
    successExportViewKeys: false,
    message: null,
  };

  exportViewKeys = () => {
    const { addresses } = this.props;

    const zAddresses = addresses.filter(addr => addr.startsWith('z'));

    Promise.all(
      zAddresses.map(async (zAddr) => {
        const viewKey = await rpc.z_exportviewingkey(zAddr);
        return { zAddress: zAddr, key: viewKey };
      }),
    ).then((viewKeys) => {
      this.setState({
        viewKeys,
        successExportViewKeys: true,
      });
    });
  };

  handleCloseModal = (fn: () => void) => () => {
    this.setState(
      {
        message: null,
      },
      fn,
    );
  };

  render = () => {
    const {
      viewKeys, isLoading, successExportViewKeys, message,
    } = this.state;

    return (
      <Wrapper>
        <ModalComponent
          renderTrigger={toggleVisibility => (
            <Button label='Export view keys' onClick={toggleVisibility} />
          )}
          closeOnBackdropClick={false}
          closeOnEsc={false}
        >
          {toggleVisibility => (
            <ConfirmDialogComponent
              title='Export view keys'
              handleClose={this.handleCloseModal(toggleVisibility)}
              onConfirm={this.exportViewKeys}
              showButtons={!successExportViewKeys}
              width={750}
            >
              <ModalContent>
                {successExportViewKeys ? (
                  <>
                    <InputComponent
                      inputType='textarea'
                      rows={10}
                      value={viewKeys.reduce(
                        (acc, cur, idx) => `${acc}${cur.key} ${
                          idx === viewKeys.length - 1 ? '' : '\n\n'
                        }`,
                        '',
                      )}
                      onFocus={(event) => {
                        event.currentTarget.select();
                        document.execCommand('copy');
                        this.setState({ message: 'Copied to clipboard!' });
                      }}
                    />
                    {message && (
                      <TextComponent value={message} align='center' />
                    )}
                  </>
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
          )}
        </ModalComponent>
      </Wrapper>
    );
  };
}
