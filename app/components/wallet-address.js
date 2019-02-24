// @flow

import React, { PureComponent } from 'react';
import styled, { withTheme } from 'styled-components';

import { ColumnComponent } from './column';
import { TextComponent } from './text';
import { QRCode } from './qrcode';
import { CopyToClipboard } from './copy-to-clipboard';

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

const Address = styled(TextComponent)`
  border-radius: ${props => props.theme.boxBorderRadius};
  border: none;
  background-color: ${props => props.theme.colors.inputBg};
  padding: 15px;
  width: 92%;
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

  /* // todo: make this theme supported */
  ${AddressWrapper}:hover & {
    color: ${props => props.theme.colors.walletAddressInputHovered};
  }

  ::placeholder {
    opacity: 0.5;
  }
`;

const QRCodeContainer = styled.div`
  align-items: center;
  display: flex;
  background-color: ${props => props.theme.colors.qrCodeWrapperBg}
  border: 1px solid ${props => props.theme.colors.qrCodeWrapperBorder}
  border-radius: ${props => props.theme.boxBorderRadius};
  padding: 20px;
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

type Props = {
  address: string,
  theme: AppTheme,
};

type State = {
  showCopiedTooltip: boolean,
  showQRCode: boolean,
};

class Component extends PureComponent<Props, State> {
  state = {
    showQRCode: false,
    showCopiedTooltip: false,
  };

  showMoreInfo = () => this.setState(() => ({ showQRCode: true }));

  toggleMoreInfo = () => this.setState(prevState => ({
    showQRCode: !prevState.showQRCode,
  }));

  hideTooltip = () => this.setState(() => ({ showCopiedTooltip: false }));

  copyAddress = () => this.setState(
    () => ({ showCopiedTooltip: true }),
    () => setTimeout(() => this.hideTooltip(), 1500),
  );

  render() {
    const { address, theme } = this.props;
    const { showQRCode, showCopiedTooltip } = this.state;

    const qrCodeIcon = theme.mode === DARK ? ScanIconDark : ScanIconLight;

    const copyIcon = theme.mode === DARK ? CopyIconDark : CopyIconLight;

    return (
      <ColumnComponent width='100%'>
        <AddressWrapper>
          <Address
            value={address}
            onClick={this.toggleMoreInfo}
            onDoubleClick={this.showMoreInfo}
          />
          <ActionsWrapper>
            <CopyToClipboard text={address} onCopy={this.copyAddress}>
              <IconButton onClick={() => {}}>
                {!showCopiedTooltip ? null : (
                  <CopyTooltip>
                    <TooltipText value='Copied!' />
                  </CopyTooltip>
                )}
                <IconImage src={copyIcon} alt='Copy Address' />
              </IconButton>
            </CopyToClipboard>
            <IconButton onClick={this.toggleMoreInfo}>
              <IconImage src={qrCodeIcon} alt='See QRCode' />
            </IconButton>
          </ActionsWrapper>
        </AddressWrapper>
        {!showQRCode ? null : (
          <QRCodeContainer>
            <QRCodeWrapper>
              <QRCode value={address} />
            </QRCodeWrapper>
          </QRCodeContainer>
        )}
      </ColumnComponent>
    );
  }
}

export const WalletAddress = withTheme(Component);
