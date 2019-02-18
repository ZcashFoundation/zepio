// @flow

import React, { PureComponent } from 'react';
import styled, { withTheme } from 'styled-components';

import { ColumnComponent } from './column';
import { QRCode } from './qrcode';

import CopyIconDark from '../assets/images/copy_icon_dark.svg';
import CopyIconLight from '../assets/images/copy_icon_light.svg';
import ScanIconDark from '../assets/images/scan_icon_dark.svg';
import ScanIconLight from '../assets/images/scan_icon_light.svg';
import { DARK } from '../constants/themes';

const AddressWrapper = styled.div`
  align-items: center;
  display: flex;
  border-radius: ${props => props.theme.boxBorderRadius};
  padding: 0 13px 0 0;
  margin-bottom: 10px;
  width: 100%;
  background: ${props => props.theme.colors.walletAddressBg};
  border: 1px solid ${props => props.theme.colors.walletAddressBorder};
`;

const Input = styled.input`
  border-radius: ${props => props.theme.boxBorderRadius};
  border: none;
  background-color: ${props => props.theme.colors.inputBg};
  padding: 15px;
  width: 100%;
  outline: none;
  font-family: ${props => props.theme.fontFamily};
  font-size: 13px;
  color: #666666;
  line-height: 1;
  cursor: pointer;

  ${AddressWrapper}:hover & {
    color: #fff;
  }

  ::placeholder {
    opacity: 0.5;
  }
`;

const QRCodeWrapper = styled.div`
  align-items: center;
  display: flex;
  background-color: ${props => props.theme.colors.qrCodeWrapperBg}
  border: 1px solid ${props => props.theme.colors.qrCodeWrapperBorder}
  border-radius: 3px;
  padding: 20px;
  margin-bottom: 10px;
  width: 100%;
`;

const IconButton = styled.button`
  background: transparent;
  cursor: pointer;
  outline: none;
  border: none;
  display: flex;
  opacity: 0.4;
  width: 28px;
  margin-left: 3px;

  &:hover {
    opacity: 1;
  }
`;

const IconImage = styled.img`
  max-width: 23px;
`;

type Props = {
  address: string,
  theme: AppTheme,
};

type State = {
  showQRCode: boolean,
};

class Component extends PureComponent<Props, State> {
  state = {
    showQRCode: false,
  };

  show = () => this.setState(() => ({ showQRCode: true }));

  hide = () => this.setState(() => ({ showQRCode: false }));

  render() {
    const { address, theme } = this.props;
    const { showQRCode } = this.state;
    const toggleVisibility = showQRCode ? this.hide : this.show;

    const qrCodeIcon = theme.mode === DARK
      ? ScanIconDark
      : ScanIconLight;

    const copyIcon = theme.mode === DARK
      ? CopyIconDark
      : CopyIconLight;

    return (
      <ColumnComponent width='100%'>
        <AddressWrapper>
          <Input
            value={address}
            onChange={() => {}}
            onFocus={event => event.currentTarget.select()}
          />
          <IconButton onClick={() => {}}>
            <IconImage
              src={copyIcon}
              alt='Copy Address'
            />
          </IconButton>
          <IconButton onClick={toggleVisibility}>
            <IconImage
              src={qrCodeIcon}
              alt='See QRCode'
            />
          </IconButton>
        </AddressWrapper>
        {!showQRCode ? null : (
          <QRCodeWrapper>
            <QRCode value={address} />
          </QRCodeWrapper>
        )}
      </ColumnComponent>
    );
  }
}

export const WalletAddress = withTheme(Component);
