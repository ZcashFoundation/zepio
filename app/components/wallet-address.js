// @flow

import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { ColumnComponent } from './column';
import { QRCode } from './qrcode';

import eyeIcon from '../assets/images/eye.png';

const AddressWrapper = styled.div`
  align-items: center;
  display: flex;
  background-color: #000;
  border-radius: 6px;
  padding: 0 13px 0 0;
  margin-bottom: 10px;
  width: 100%;
`;

const Input = styled.input`
  border-radius: ${props => props.theme.boxBorderRadius};
  border: none;
  background-color: ${props => props.theme.colors.inputBg};
  color: ${props => props.theme.colors.text};
  padding: 15px;
  width: 100%;
  outline: none;
  font-family: ${props => props.theme.fontFamily};

  ::placeholder {
    opacity: 0.5;
  }
`;

const QRCodeWrapper = styled.div`
  align-items: center;
  display: flex;
  background-color: ${props => props.theme.colors.qrCodeWrapperBg}
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 10px;
  width: 100%;
`;

const IconButton = styled.button`
  background: transparent;
  cursor: pointer;
  outline: none;
`;

const IconImage = styled.img`
  max-width: 15px;
`;

type Props = {
  address: string,
};

type State = {
  showQRCode: boolean,
};

export class WalletAddress extends PureComponent<Props, State> {
  state = {
    showQRCode: false,
  };

  show = () => this.setState(() => ({ showQRCode: true }));

  hide = () => this.setState(() => ({ showQRCode: false }));

  render() {
    const { address } = this.props;
    const { showQRCode } = this.state;
    const toggleVisibility = showQRCode ? this.hide : this.show;

    return (
      <ColumnComponent width='100%'>
        <AddressWrapper>
          <Input
            value={address}
            onChange={() => {}}
            onFocus={event => event.currentTarget.select()}
          />
          <IconButton onClick={toggleVisibility}>
            <IconImage
              src={eyeIcon}
              alt='See QRCode'
            />
          </IconButton>
          <IconButton onClick={() => {}}>
            <IconImage
              src={eyeIcon}
              alt='Copy Address'
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
