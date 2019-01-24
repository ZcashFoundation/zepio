// @flow
import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { BigNumber } from 'bignumber.js';

import FEES from '../constants/fees';

import { InputLabelComponent } from '../components/input-label';
import { InputComponent } from '../components/input';
import { TextComponent } from '../components/text';
import { SelectComponent } from '../components/select';
import { RowComponent } from '../components/row';
import { ColumnComponent } from '../components/column';
import { Divider } from '../components/divider';
import { Button } from '../components/button';
import { ConfirmDialogComponent } from '../components/confirm-dialog';

import formatNumber from '../utils/formatNumber';

import type { SendTransactionInput } from '../containers/send';
import type { State as SendState } from '../redux/modules/send';

import SentIcon from '../assets/images/transaction_sent_icon.svg';
import MenuIcon from '../assets/images/menu_icon.svg';
import ValidIcon from '../assets/images/green_check.png';
import InvalidIcon from '../assets/images/error_icon.png';
import LoadingIcon from '../assets/images/sync_icon.png';

import theme from '../theme';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.img`
  width: 25px;
  height: 25px;
  animation: 2s linear infinite;
  animation-name: ${rotate};
  margin-bottom: 10px;
`;

const FormWrapper = styled.div`
  margin-top: ${props => props.theme.layoutContentPaddingTop};
  width: 71%;
`;

const SendWrapper = styled(ColumnComponent)`
  margin-top: 60px;
  width: 25%;
`;

const AmountWrapper = styled.div`
  width: 100%;
  &:before {
    content: 'ZEC';
    font-family: ${props => props.theme.fontFamily};
    position: absolute;
    margin-top: 15px;
    margin-left: 15px;
    display: block;
    transition: all 0.05s ease-in-out;
    opacity: ${props => (props.isEmpty ? '0' : '1')};
    color: #fff;
  }
`;

const AmountInput = styled(InputComponent)`
  padding-left: ${props => (props.isEmpty ? '15' : '50')}px;
`;

const ShowFeeButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  width: 100%;
  color: ${props => props.theme.colors.text};
  outline: none;
  margin-bottom: 15px;
  margin-top: 15px;
`;

const SeeMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border-style: solid;
  border-radius: 100%;
  border-width: 1px;
  border-color: ${props => (props.isOpen
    ? props.theme.colors.activeItem
    : props.theme.colors.inactiveItem)};
  background-color: transparent;
  padding: 5px;
  cursor: pointer;
  margin-right: 10px;
  margin-left: -2px;

  &:hover {
    border-color: ${props => props.theme.colors.activeItem};
  }
`;

const SeeMoreIcon = styled.img`
  width: 25px;
  height: 25px;
`;

const FeeWrapper = styled.div`
  background-color: #000;
  border-radius: 6px;
  padding: 13px 19px;
  margin-bottom: 20px;
`;

const InfoCard = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.cardBackgroundColor};
  border-radius: ${props => props.theme.boxBorderRadius};
`;

const InfoContent = styled.div`
  padding: 15px;
`;

const InfoCardLabel = styled(TextComponent)`
  opacity: 0.5;
  margin-bottom: 10px;
`;

const InfoCardUSD = styled(TextComponent)`
  opacity: 0.5;
  margin-top: 2.5px;
`;

const FormButton = styled(Button)`
  margin: 10px 0;
  border-color: ${props => (props.focused
    ? props.theme.colors.activeItem
    : props.theme.colors.inactiveItem)};

  &:hover {
    border-color: ${props => (props.focused
    ? props.theme.colors.activeItem
    : props.theme.colors.inactiveItem)};
    background-color: ${props => (props.focused
    ? props.theme.colors.activeItem
    : props.theme.colors.inactiveItem)};
  }
`;

const ModalContent = styled(ColumnComponent)`
  min-height: 400px;
  align-items: center;
  justify-content: center;

  p {
    word-break: break-all;
  }
`;

const ConfirmItemWrapper = styled(RowComponent)`
  padding: 22.5px 33.5px;
  width: 100%;
`;

const ItemLabel = styled(TextComponent)`
  font-weight: ${props => props.theme.fontWeight.bold};
  font-size: ${props => props.theme.fontSize.small};
  color: ${props => props.color || props.theme.colors.modalItemLabel};
  margin-bottom: 3.5px;
`;

const SendZECValue = styled(TextComponent)`
  color: ${props => props.theme.colors.transactionSent};
  font-size: ${props => `${props.theme.fontSize.large}em`};
  font-weight: ${props => props.theme.fontWeight.bold};
`;

const SendUSDValue = styled(TextComponent)`
  opacity: 0.5;
  font-weight: ${props => props.theme.fontWeight.light};
  font-size: ${props => `${props.theme.fontSize.medium}em`};
`;

const Icon = styled.img`
  width: 35px;
  height: 35px;
  margin-left: 15px;
`;

const ValidateStatusIcon = styled.img`
  width: 13px;
  height: 13px;
  margin-right: 7px;
`;

const ShowFeeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  color: ${props => props.theme.colors.text};
  outline: none;
  display: flex;
  align-items: center;
  margin-top: 30px;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const SeeMoreIcon = styled.img`
  width: 25px;
  height: 25px;
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 100%;
  margin-right: 11.5px;
`;

type Props = SendState & {
  balance: number,
  zecPrice: number,
  addresses: string[],
  sendTransaction: SendTransactionInput => void,
  resetSendView: () => void,
  validateAddress: ({ address: string }) => void,
};

type State = {
  showFee: boolean,
  from: string,
  amount: string,
  to: string,
  feeType: string | number,
  fee: number | null,
  memo: string,
};

const initialState = {
  showFee: false,
  from: '',
  amount: '',
  to: '',
  feeType: FEES.LOW,
  fee: FEES.LOW,
  memo: '',
};

export class SendView extends PureComponent<Props, State> {
  state = initialState;

  componentDidMount() {
    const { resetSendView } = this.props;

    resetSendView();
  }

  handleChange = (field: string) => (value: string) => {
    const { validateAddress } = this.props;

    if (field === 'to') {
      // eslint-disable-next-line max-len
      this.setState({ [field]: value }, () => validateAddress({ address: value }));
    } else {
      this.setState(() => ({ [field]: value }));
    }
  };

  handleChangeFeeType = (value: string) => {
    if (value === FEES.CUSTOM) {
      this.setState({
        feeType: FEES.CUSTOM,
        fee: null,
      });
    } else {
      const fee = new BigNumber(value);

      this.setState({
        feeType: fee.toString(),
        fee: fee.toNumber(),
      });
    }
  };

  handleSubmit = () => {
    const {
      from, amount, to, memo, fee,
    } = this.state;
    const { sendTransaction } = this.props;

    if (!from || !amount || !to || !fee) return;

    sendTransaction({
      from,
      to,
      amount,
      fee,
      memo,
    });
  };

  showModal = (toggle: void => void) => () => {
    const {
      from, amount, to, fee,
    } = this.state;
    const { isToAddressValid } = this.props;

    if (!from || !amount || !to || !fee || !isToAddressValid) return;

    toggle();
  };

  reset = () => {
    const { resetSendView } = this.props;

    this.setState(initialState, () => resetSendView());
  };

  getFeeText = () => {
    const { fee } = this.state;

    const feeValue = new BigNumber(fee);

    if (feeValue.isEqualTo(FEES.LOW)) return `Low ZEC ${feeValue.toString()}`;
    // eslint-disable-next-line max-len
    if (feeValue.isEqualTo(FEES.MEDIUM)) return `Medium ZEC ${feeValue.toString()}`;
    if (feeValue.isEqualTo(FEES.HIGH)) return `High ZEC ${feeValue.toString()}`;

    return `Custom ZEC ${feeValue.toString()}`;
  };

  renderValidationStatus = () => {
    const { isToAddressValid } = this.props;

    return isToAddressValid ? (
      <RowComponent alignItems='center'>
        <ValidateStatusIcon src={ValidIcon} />
        <ItemLabel value='VALID' color={theme.colors.transactionReceived} />
      </RowComponent>
    ) : (
      <RowComponent alignItems='center'>
        <ValidateStatusIcon src={InvalidIcon} />
        <ItemLabel value='INVALID' color={theme.colors.transactionSent} />
      </RowComponent>
    );
  };

  renderModalContent = ({
    valueSent,
    valueSentInUsd,
    toggle,
  }: {
    valueSent: string,
    valueSentInUsd: string,
    toggle: () => void,
  }) => {
    const { operationId, isSending, error } = this.props;
    const { from, to } = this.state;

    if (isSending) {
      return (
        <>
          <Loader src={LoadingIcon} />
          <TextComponent value='Processing transaction...' />
        </>
      );
    }

    if (operationId) {
      return (
        <>
          <TextComponent
            value={`Transaction ID: ${operationId}`}
            align='center'
          />
          <button
            type='button'
            onClick={() => {
              this.reset();
              toggle();
            }}
          >
            Send again!
          </button>
        </>
      );
    }

    if (error) return <TextComponent value={error} />;

    return (
      <>
        <ConfirmItemWrapper alignItems='center'>
          <ColumnComponent>
            <ItemLabel value='AMOUNT' />
            <SendZECValue value={`-${valueSent}`} />
            <SendUSDValue value={`-${valueSentInUsd}`} />
          </ColumnComponent>
          <ColumnComponent>
            <Icon src={SentIcon} alt='Transaction Type Icon' />
          </ColumnComponent>
        </ConfirmItemWrapper>
        <Divider opacity={0.3} />
        <ConfirmItemWrapper alignItems='center'>
          <ColumnComponent>
            <ItemLabel value='FEE' />
            <TextComponent value={this.getFeeText()} />
          </ColumnComponent>
        </ConfirmItemWrapper>
        <Divider opacity={0.3} />
        <ConfirmItemWrapper alignItems='center'>
          <ColumnComponent>
            <ItemLabel value='FROM' />
            <TextComponent value={from} />
          </ColumnComponent>
        </ConfirmItemWrapper>
        <Divider opacity={0.3} />
        <ConfirmItemWrapper alignItems='center'>
          <ColumnComponent>
            <ItemLabel value='TO' />
            <TextComponent value={to} />
          </ColumnComponent>
        </ConfirmItemWrapper>
        <Divider opacity={0.3} marginBottom='27.5px' />
      </>
    );
  };

  render() {
    const {
      addresses,
      balance,
      zecPrice,
      isSending,
      error,
      operationId,
    } = this.props;
    const {
      showFee, from, amount, to, memo, fee, feeType,
    } = this.state;

    const isEmpty = amount === '';

    const fixedAmount = isEmpty ? '0.00' : amount;

    const zecBalance = formatNumber({ value: balance, append: 'ZEC ' });
    const zecBalanceInUsd = formatNumber({
      value: new BigNumber(balance).times(zecPrice).toNumber(),
      append: 'USD $',
    });
    const valueSent = formatNumber({
      value: new BigNumber(fixedAmount).toFormat(2),
      append: 'ZEC ',
    });
    const valueSentInUsd = formatNumber({
      value: new BigNumber(amount).times(zecPrice).toNumber(),
      append: 'USD $',
    });

    return (
      <RowComponent justifyContent='space-between'>
        <FormWrapper>
          <InputLabelComponent value='From' />
          <SelectComponent
            onChange={this.handleChange('from')}
            value={from}
            placeholder='Select a address'
            options={addresses.map(addr => ({ value: addr, label: addr }))}
          />
          <InputLabelComponent value='Amount' />
          <AmountWrapper isEmpty={isEmpty}>
            <AmountInput
              isEmpty={isEmpty}
              type='number'
              onChange={this.handleChange('amount')}
              value={String(amount)}
              placeholder='ZEC 0.0'
              min={0.01}
            />
          </AmountWrapper>
          <InputLabelComponent value='To' />
          <InputComponent
            onChange={this.handleChange('to')}
            value={to}
            placeholder='Enter Address'
            renderRight={to ? this.renderValidationStatus : () => null}
          />
          <InputLabelComponent value='Memo' />
          <InputComponent
            onChange={this.handleChange('memo')}
            value={memo}
            inputType='textarea'
            placeholder='Enter a text here'
          />
          <ShowFeeButton
            onClick={() => this.setState(state => ({ showFee: !state.showFee }))
            }
          >
            <SeeMoreIcon src={MenuIcon} alt='Show more icon' />
            <TextComponent
              value={`${showFee ? 'Hide' : 'Show'} Additional Options`}
            />
          </ShowFeeButton>
          {showFee && (
            <FeeWrapper>
              <RowComponent alignItems='flex-end' justifyContent='space-between'>
                <ColumnComponent width='74%'>
                  <InputLabelComponent value='Fee' />
                  <InputComponent
                    type='number'
                    onChange={this.handleChange('fee')}
                    value={String(fee)}
                    disabled={feeType !== FEES.CUSTOM}
                    bgColor={theme.colors.blackTwo}
                  />
                </ColumnComponent>
                <ColumnComponent width='25%'>
                  <SelectComponent
                    onChange={this.handleChangeFeeType}
                    value={String(feeType)}
                    options={Object.keys(FEES).map(cur => ({
                      label: cur.toLowerCase(),
                      value: String(FEES[cur]),
                    }))}
                    placement='top'
                    bgColor={theme.colors.blackTwo}
                  />
                </ColumnComponent>
              </RowComponent>
            </FeeWrapper>
          )}
          {feeType === FEES.CUSTOM && (
            <TextComponent value='Custom fees may compromise your privacy since fees are transparent' />
          )}
        </FormWrapper>
        <SendWrapper>
          <InfoCard>
            <InfoContent>
              <InfoCardLabel value='Available Funds:' />
              <TextComponent value={zecBalance} size={1.25} isBold />
              <InfoCardUSD value={zecBalanceInUsd} size={0.84375} />
            </InfoContent>
            <Divider opacity={0.3} />
            <InfoContent>
              <InfoCardLabel value='Sending' />
              <TextComponent value={valueSent} size={1.25} isBold />
              <InfoCardUSD value={valueSentInUsd} size={0.84375} />
            </InfoContent>
          </InfoCard>
          <ConfirmDialogComponent
            title='Please Confirm Transaction Details'
            onConfirm={this.handleSubmit}
            renderTrigger={toggle => (
              <FormButton
                label='Send'
                variant='secondary'
                focused
                onClick={this.showModal(toggle)}
              />
            )}
            showButtons={!isSending && !error && !operationId}
            onClose={this.reset}
          >
            {toggle => (
              <ModalContent>
                {this.renderModalContent({ valueSent, valueSentInUsd, toggle })}
              </ModalContent>
            )}
          </ConfirmDialogComponent>
          <FormButton label='Cancel' variant='secondary' />
        </SendWrapper>
      </RowComponent>
    );
  }
}
