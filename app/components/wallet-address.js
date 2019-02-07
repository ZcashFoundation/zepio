// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

import { ColumnComponent } from './column';
import { Button } from './button';
import { QRCode } from './qrcode';

import { truncateAddress } from '../utils/truncate-address';

import eyeIcon from '../assets/images/eye.png';

const AddressWrapper = styled.div`
  align-items: center;
  display: flex;
  background-color: #000;
  border-radius: 6px;
  padding: 7px 13px;
  width: 100%;
`;

const Input = styled.input`
  border-radius: ${(props: PropsWithTheme<>) => props.theme.boxBorderRadius};
  border: none;
  background-color: ${(props: PropsWithTheme<>) => props.theme.colors.inputBackground};
  color: ${(props: PropsWithTheme<>) => props.theme.colors.text};
  padding: 15px;
  width: 100%;
  outline: none;
  font-family: ${(props: PropsWithTheme<>) => props.theme.fontFamily};

  ::placeholder {
    opacity: 0.5;
  }
`;

const QRCodeWrapper = styled.div`
  align-items: center;
  display: flex;
  background-color: #000;
  border-radius: 6px;
  padding: 20px;
  margin-top: 10px;
  width: 100%;
`;

type Props = {
  address: string,
};

type State = {
  isVisible: boolean,
};

export class WalletAddress extends Component<Props, State> {
  state = {
    isVisible: false,
  };

  show = () => this.setState(() => ({ isVisible: true }));

  hide = () => this.setState(() => ({ isVisible: false }));

  render() {
    const { address } = this.props;
    const { isVisible } = this.state;
    const toggleVisibility = isVisible ? this.hide : this.show;

    return (
      <ColumnComponent width='100%'>
        <AddressWrapper>
          <Input
            value={isVisible ? address : truncateAddress(address)}
            onChange={() => {}}
            onFocus={event => event.currentTarget.select()}
          />
          <Button
            icon={eyeIcon}
            label={`${isVisible ? 'Hide' : 'Show'} full address and QR Code`}
            onClick={toggleVisibility}
            variant='secondary'
          />
        </AddressWrapper>
        {!isVisible ? null : (
          <QRCodeWrapper>
            <QRCode value={address} />
          </QRCodeWrapper>
        )}
      </ColumnComponent>
    );
  }
}
