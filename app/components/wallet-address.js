// @flow

import React, { PureComponent } from 'react';
import styled, { withTheme } from 'styled-components';

import { ColumnComponent } from './column';
import { TextComponent } from './text';
import { QRCode } from './qrcode';
import { CopyToClipboard } from './copy-to-clipboard';
import { Button } from './button';

import CopyIconDark from '../assets/images/copy_icon_dark.svg';
import CopyIconLight from '../assets/images/copy_icon_light.svg';
import ScanIconDark from '../assets/images/scan_icon_dark.svg';
import ScanIconLight from '../assets/images/scan_icon_light.svg';
import { DARK } from '../constants/themes';

import { formatNumber } from '../utils/format-number';
import { getCoinName } from '../utils/get-coin-name';

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

const Address = styled(TextComponent)`
  border-radius: ${props => props.theme.boxBorderRadius};
  border: none;
  background-color: ${props => props.theme.colors.inputBg};
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 15px;
  width: 90%;
  outline: none;
  font-family: ${props => props.theme.fontFamily};
  font-size: 13px;
  color: ${props => props.theme.colors.walletAddressInput};
  line-height: 1;
  letter-spacing: 0.5px;
  overflow-x: scroll;
  cursor: pointer;
  user-select: text;

  ::-webkit-scrollbar {
    display: none;
  }

  ${AddressWrapper}:hover & {
    color: ${props => props.theme.colors.walletAddressInputHovered};
  }

  ::placeholder {
    opacity: 0.5;
  }
`;

const AddressBalance = styled(TextComponent)`
  font-weight: 700;
  padding-left: 12px;
  font-size: 12px;
  color: ${props => props.theme.colors.walletAddressInput};
  width: 10%;

  ${AddressWrapper}:hover & {
    color: ${props => props.theme.colors.walletAddressInputHovered};
  }
`;

const InnerWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  padding: 10px 0;
`;

const QRCodeContainer = styled.div`
  align-items: center;
  display: flex;
  background-color: ${props => props.theme.colors.qrCodeWrapperBg}
  border: 1px solid ${props => props.theme.colors.qrCodeWrapperBorder}
  border-radius: ${props => props.theme.boxBorderRadius};
  padding: 20px 20px 20px 10px;
  margin-bottom: 10px;
  width: 100%;
`;

const QRCodeWrapper = styled.div`
  background-color: #ffffff;
  padding: 10px;
`;

const IconButton = styled.button`
  background: transparent;
  cursor: pointer;
  outline: none;
  border: none;
  display: flex;
  width: 28px;
  margin-left: 3px;
  position: relative;
`;

const IconImage = styled.img`
  max-width: 23px;
  opacity: 0.4;

  ${IconButton}:hover & {
    opacity: 1;
  }
`;

const CopyTooltip = styled.div`
  background: ${props => props.theme.colors.walletAddressTooltipBg};
  position: absolute;
  top: -27px;
  left: -8px;
  padding: 6px 10px;
  border-radius: ${props => props.theme.boxBorderRadius};
`;

const TooltipText = styled(TextComponent)`
  color: ${props => props.theme.colors.walletAddressTooltip};
  font-size: 10px;
  font-weight: 700;
`;

const ActionsWrapper = styled.div`
  width: 8%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const AddressDetailsValue = styled(TextComponent)`
  margin-bottom: 25px;
  font-size: 15px;
  word-break: break-all;
  user-select: text;
  letter-spacing: 0.5px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const AddressDetailsLabel = styled.div`
  font-weight: 700;
  text-transform: uppercase;
  color: ${props => props.theme.colors.transactionLabelText};
  font-size: 0.759375em;
  font-weight: 700;
  font-family: Roboto;
  margin-bottom: 8px;
`;

const AddressDetailsWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 15px 20px 0 20px;
`;

const FormButton = styled(Button)`
  width: 100%;
  margin: 5px 0;

  &:first-child {
    margin-top: 0;
  }
`;

const Column = styled.div`
  display: flex;
  padding-bottom: 15px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const SecondaryColumn = styled(Column)`
  padding-bottom: 0;
`;

const Row = styled(Column)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const ButtonWrapper = styled.div`
  max-width: 200px;
`;

type Props = {
  address: string,
  theme: AppTheme,
  balance: number,
};

type State = {
  showCopiedTooltip: boolean,
  isSecondaryCopied: boolean,
  showQRCode: boolean,
};

class Component extends PureComponent<Props, State> {
  state = {
    showQRCode: false,
    showCopiedTooltip: false,
    isSecondaryCopied: false,
  };

  showMoreInfo = () => this.setState(() => ({ showQRCode: true }));

  toggleMoreInfo = () => this.setState(prevState => ({
    showQRCode: !prevState.showQRCode,
  }));

  hideTooltip = () => this.setState(() => ({ showCopiedTooltip: false }));

  unCopySecondary = () => this.setState(() => ({ isSecondaryCopied: false }));

  copyAddress = () => this.setState(
    () => ({ showCopiedTooltip: true }),
    () => setTimeout(() => this.hideTooltip(), 1500),
  );

  copySecondaryAddress = () => this.setState(
    () => ({ isSecondaryCopied: true }),
    () => setTimeout(() => this.unCopySecondary(), 1500),
  );

  render() {
    const { address, balance, theme } = this.props;
    const { showQRCode, showCopiedTooltip, isSecondaryCopied } = this.state;

    const qrCodeIcon = theme.mode === DARK ? ScanIconDark : ScanIconLight;

    const copyIcon = theme.mode === DARK ? CopyIconDark : CopyIconLight;

    const coinName = getCoinName();

    return (
      <ColumnComponent id='wallet-address' width='100%'>
        <AddressWrapper>
          <InnerWrapper>
            <AddressBalance
              id='wallet-address-balance'
              value={formatNumber({ append: `${coinName} `, value: balance })}
            />
            <Address
              id='wallet-address-text'
              value={address}
              onClick={this.toggleMoreInfo}
              onDoubleClick={this.showMoreInfo}
            />
          </InnerWrapper>
          <ActionsWrapper>
            <CopyToClipboard text={address} onCopy={this.copyAddress}>
              <IconButton id='wallet-address-copy' onClick={() => {}}>
                {!showCopiedTooltip ? null : (
                  <CopyTooltip id='wallet-address-copy-tooltip'>
                    <TooltipText value='Copied!' />
                  </CopyTooltip>
                )}
                <IconImage src={copyIcon} alt='Copy Address' />
              </IconButton>
            </CopyToClipboard>
            <IconButton id='wallet-address-see-qrcode' onClick={this.toggleMoreInfo}>
              <IconImage src={qrCodeIcon} alt='See QRCode' />
            </IconButton>
          </ActionsWrapper>
        </AddressWrapper>
        {!showQRCode ? null : (
          <QRCodeContainer id='wallet-address-qr-code'>
            <QRCodeWrapper>
              <QRCode value={address} />
            </QRCodeWrapper>
            <AddressDetailsWrapper>
              <Column>
                <AddressDetailsLabel>Address</AddressDetailsLabel>
                <AddressDetailsValue value={address} />
              </Column>
              <Row>
                <SecondaryColumn>
                  <AddressDetailsLabel>Funds</AddressDetailsLabel>
                  <AddressDetailsValue
                    value={formatNumber({ append: `${coinName} `, value: balance })}
                  />
                </SecondaryColumn>
                <ButtonWrapper>
                  <CopyToClipboard text={address} onCopy={this.copySecondaryAddress}>
                    <FormButton
                      id='send-submit-button'
                      label={isSecondaryCopied ? 'Copied!' : 'Copy Address'}
                      variant='primary'
                      focused
                      isFluid
                    />
                  </CopyToClipboard>
                </ButtonWrapper>
              </Row>
            </AddressDetailsWrapper>
          </QRCodeContainer>
        )}
      </ColumnComponent>
    );
  }
}

export const WalletAddress = withTheme(Component);
