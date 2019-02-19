// @flow

import React, { Fragment, PureComponent } from 'react';
import styled, { withTheme, keyframes } from 'styled-components';
import { BigNumber } from 'bignumber.js';
import { Transition, animated } from 'react-spring';

import { FEES } from '../constants/fees';
import { DARK } from '../constants/themes';

import { InputLabelComponent } from '../components/input-label';
import { InputComponent } from '../components/input';
import { TextComponent } from '../components/text';
import { SelectComponent } from '../components/select';
import { RowComponent } from '../components/row';
import { ColumnComponent } from '../components/column';
import { Divider } from '../components/divider';
import { Button } from '../components/button';
import { ConfirmDialogComponent } from '../components/confirm-dialog';

import { formatNumber } from '../utils/format-number';
import { ascii2hex } from '../utils/ascii-to-hexadecimal';

import SentIcon from '../assets/images/transaction_sent_icon_dark.svg';
import MenuIconDark from '../assets/images/menu_icon_dark.svg';
import MenuIconLight from '../assets/images/menu_icon_light.svg';
import ValidIcon from '../assets/images/green_check_dark.png';
import InvalidIcon from '../assets/images/error_icon_dark.png';
import LoadingIcon from '../assets/images/sync_icon_dark.png';
import ArrowUpIconDark from '../assets/images/arrow_up_dark.png';
import ArrowUpIconLight from '../assets/images/arrow_up_light.png';

import type { SendTransactionInput } from '../containers/send';
import type { State as SendState } from '../redux/modules/send';

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
  width: 71%;
`;

const SendWrapper = styled(ColumnComponent)`
  width: 25%;
  margin-top: 42px;
`;

const Label = styled(InputLabelComponent)`
  text-transform: uppercase;
  color: ${props => props.theme.colors.transactionsDate};
  font-size: ${props => `${props.theme.fontSize.regular * 0.9}em`};
  font-weight: ${props => String(props.theme.fontWeight.bold)};
`;

type AmountProps =
  | {
      isEmpty: boolean,
    }
  | Object;
const AmountWrapper = styled.div`
  width: 100%;
  position: relative;

  &:before {
    content: 'ZEC';
    font-family: ${props => props.theme.fontFamily};
    position: absolute;
    margin-top: 15px;
    margin-left: 15px;
    display: block;
    transition: all 0.05s ease-in-out;
    opacity: ${(props: AmountProps) => (props.isEmpty ? '0' : '1')};
    color: #fff;
    z-index: 10;
  }
`;

const AmountInput = styled(InputComponent)`
  padding-left: ${(props: AmountProps) => (props.isEmpty ? '15' : '50')}px;
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

const FeeWrapper = styled.div`
  background-color: ${props => props.theme.colors.sendAdditionalOptionsBg};
  border: 1px solid ${props => props.theme.colors.sendAdditionalOptionsBorder};
  border-radius: 3px;
  padding: 0 20px 15px;
  margin-bottom: 20px;
`;

const InfoCard = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.sendCardBg};
  border: 1px solid ${props => props.theme.colors.sendCardBorder}
  border-radius: ${props => props.theme.boxBorderRadius};
  margin-bottom: 10px;
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
  width: 100%;
  margin: 5px 0;

  &:first-child {
    margin-top: 0;
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

type ItemLabelProps = {
  color: string,
};
/* eslint-disable max-len */
const ItemLabel = styled(TextComponent)`
  font-weight: ${(props: PropsWithTheme<ItemLabelProps>) => String(props.theme.fontWeight.bold)};
  font-size: ${(props: PropsWithTheme<ItemLabelProps>) => String(props.theme.fontSize.small)};
  color: ${(props: PropsWithTheme<ItemLabelProps>) => props.color || props.theme.colors.modalItemLabel};
  margin-bottom: 3.5px;
`;

const ValidateItemLabel = styled(ItemLabel)`
  margin-bottom: -1px;
`;

const SendZECValue = styled(TextComponent)`
  color: ${props => props.theme.colors.transactionSent};
  font-size: ${props => `${props.theme.fontSize.large}em`};
  font-weight: ${props => String(props.theme.fontWeight.bold)};
`;

const SendUSDValue = styled(TextComponent)`
  opacity: 0.5;
  font-weight: ${props => String(props.theme.fontWeight.light)};
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

const RevealsMain = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  & > div {
    top: 0;
    right: 0;
    left: 0;
  }
`;

// $FlowFixMe
const Checkbox = styled.input.attrs({
  type: 'checkbox',
})`
  margin-right: 10px;
`;

const MaxAvailableAmount = styled.button`
  margin-top: -15px;
  margin-right: -15px;
  width: 45px;
  height: 48px;
  border: none;
  background: none;
  color: white;
  cursor: pointer;
  border-left: 1px solid ${props => props.theme.colors.inputBorder};
  opacity: 0.8;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
  }
`;

const MaxAvailableAmountImg = styled.img`
  width: 20px;
  height: 20px;
`;

const ValidateWrapper = styled(RowComponent)`
  margin-top: 3px;
`;


const ActionsWrapper = styled(RowComponent)`
  padding: 30px 0;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const HexadecimalWrapper = styled.div`
  display: flex;
  opacity: 0.7;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const HexadecimalText = styled(TextComponent)`
  white-space: nowrap;
`;

type Props = {
  ...SendState,
  balance: number,
  zecPrice: number,
  addresses: string[],
  sendTransaction: SendTransactionInput => void,
  loadAddresses: () => void,
  resetSendView: () => void,
  validateAddress: ({ address: string }) => void,
  loadAddresses: () => void,
  loadZECPrice: () => void,
  getAddressBalance: ({ address: string }) => void,
  theme: AppTheme,
};

type State = {
  showFee: boolean,
  from: string,
  amount: string,
  to: string,
  feeType: string | number,
  fee: number | null,
  memo: string,
  isHexMemo: boolean,
};

const initialState = {
  showFee: false,
  from: '',
  amount: '',
  to: '',
  feeType: FEES.LOW,
  fee: FEES.LOW,
  memo: '',
  isHexMemo: false,
};

class Component extends PureComponent<Props, State> {
  state = initialState;

  componentDidMount() {
    const { resetSendView, loadAddresses, loadZECPrice } = this.props;

    resetSendView();
    loadAddresses();
    loadZECPrice();
  }

  handleChange = (field: string) => (value: string | number) => {
    const { validateAddress, getAddressBalance, balance } = this.props;
    const { fee, amount } = this.state;

    if (field === 'to') {
      this.setState(() => ({ [field]: value }), () => validateAddress({ address: String(value) }));
    } else if (field === 'amount') {
      const amountWithFee = new BigNumber(value).plus(fee || 0);

      const validAmount = amountWithFee.isGreaterThan(balance)
        ? new BigNumber(balance).minus(fee || 0).toNumber()
        : value;

      this.setState(() => ({ [field]: validAmount }));
    } else {
      if (field === 'from') getAddressBalance({ address: String(value) });

      this.setState(
        () => ({ [field]: value }),
        () => {
          if (field === 'fee') this.handleChange('amount')(amount);
        },
      );
    }
  };

  handleChangeFeeType = (value: string) => {
    const { amount } = this.state;

    if (value === FEES.CUSTOM) {
      this.setState(() => ({
        feeType: FEES.CUSTOM,
        fee: null,
      }));
    } else {
      const fee = new BigNumber(value);

      this.setState(
        () => ({
          feeType: fee.toString(),
          fee: fee.toNumber(),
        }),
        () => this.handleChange('amount')(amount),
      );
    }
  };

  handleSubmit = () => {
    const {
      from, amount, to, memo, fee, isHexMemo,
    } = this.state;
    const { sendTransaction } = this.props;

    if (!from || !amount || !to || !fee) return;

    sendTransaction({
      from,
      to,
      amount,
      fee,
      memo: isHexMemo ? memo : ascii2hex(memo),
    });
  };

  showModal = (toggle: void => void) => {
    const {
      from, amount, to, fee,
    } = this.state;
    // eslint-disable-next-line react/prop-types
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

    if (!fee) return '0.0';

    const feeValue = new BigNumber(fee);

    if (feeValue.isEqualTo(FEES.LOW)) return `Low ZEC ${feeValue.toString()}`;
    // eslint-disable-next-line max-len
    if (feeValue.isEqualTo(FEES.MEDIUM)) return `Medium ZEC ${feeValue.toString()}`;
    if (feeValue.isEqualTo(FEES.HIGH)) return `High ZEC ${feeValue.toString()}`;

    return `Custom ZEC ${feeValue.toString()}`;
  };

  renderValidationStatus = () => {
    const { isToAddressValid, theme } = this.props;

    return isToAddressValid ? (
      <ValidateWrapper alignItems='center'>
        <ValidateStatusIcon src={ValidIcon} />
        <ValidateItemLabel
          value='VALID'
          color={theme.colors.transactionReceived}
        />
      </ValidateWrapper>
    ) : (
      <ValidateWrapper alignItems='center'>
        <ValidateStatusIcon src={InvalidIcon} />
        <ValidateItemLabel
          value='INVALID'
          color={theme.colors.transactionSent}
        />
      </ValidateWrapper>
    );
  };

  renderModalContent = ({
    valueSent,
    valueSentInUsd,
    toggle,
  }: {
    /* eslint-disable react/no-unused-prop-types */
    valueSent: string,
    valueSentInUsd: string,
    toggle: () => void,
    /* eslint-enable react/no-unused-prop-types */
  }) => {
    // eslint-disable-next-line react/prop-types
    const { operationId, isSending, error } = this.props;
    const { from, to } = this.state;

    if (isSending) {
      return (
        <Fragment>
          <Loader src={LoadingIcon} />
          <TextComponent value='Processing transaction...' />
        </Fragment>
      );
    }

    if (operationId) {
      return (
        <ColumnComponent width='100%' id='send-success-wrapper'>
          <TextComponent value={`Transaction ID: ${operationId}`} align='center' />
          <button
            type='button'
            onClick={() => {
              this.reset();
              toggle();
            }}
          >
            Send again!
          </button>
        </ColumnComponent>
      );
    }

    if (error) return <TextComponent id='send-error-message' value={error} />;

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
      addresses, balance, zecPrice, isSending, error, operationId, theme,
    } = this.props;
    const {
      showFee, from, amount, to, memo, fee, feeType, isHexMemo,
    } = this.state;

    const isEmpty = amount === '';

    const fixedAmount = isEmpty ? 0.0 : amount;

    const zecBalance = formatNumber({ value: balance, append: 'ZEC ' });
    const zecBalanceInUsd = formatNumber({
      value: new BigNumber(balance).times(zecPrice).toNumber(),
      append: 'USD $',
    });
    const valueSent = formatNumber({
      value: new BigNumber(fixedAmount).toFormat(4),
      append: 'ZEC ',
    });
    const valueSentInUsd = formatNumber({
      value: new BigNumber(amount).times(zecPrice).toNumber(),
      append: 'USD $',
    });

    const seeMoreIcon = theme.mode === DARK
      ? MenuIconDark
      : MenuIconLight;

    const arrowUpIcon = theme.mode === DARK
      ? ArrowUpIconDark
      : ArrowUpIconLight;

    return (
      <RowComponent id='send-wrapper' justifyContent='space-between'>
        <FormWrapper>
          <Label value='From an address' />
          <SelectComponent
            onChange={this.handleChange('from')}
            value={from}
            placeholder='Select a address'
            options={addresses.map(addr => ({ value: addr, label: addr }))}
            capitalize={false}
          />
          <Label value='Amount' />
          <AmountWrapper isEmpty={isEmpty}>
            <AmountInput
              renderRight={() => (
                <MaxAvailableAmount
                  onClick={() => this.handleChange('amount')(balance)}
                  disabled={!from}
                >
                  <MaxAvailableAmountImg src={arrowUpIcon} />
                </MaxAvailableAmount>
              )}
              isEmpty={isEmpty}
              type='number'
              onChange={this.handleChange('amount')}
              value={String(amount)}
              placeholder='ZEC 0.0'
              min={0.01}
              name='amount'
              disabled={!from}
            />
          </AmountWrapper>
          <Label value='To' />
          <InputComponent
            onChange={this.handleChange('to')}
            value={to}
            placeholder='Enter Address'
            renderRight={to ? this.renderValidationStatus : () => null}
            name='to'
          />
          <Label value='Memo' />
          <InputComponent
            onChange={this.handleChange('memo')}
            value={memo}
            inputType='textarea'
            placeholder='Enter a text here'
            name='memo'
          />
          <ActionsWrapper>
            <ShowFeeButton
              id='send-show-additional-options-button'
              onClick={() => this.setState(state => ({
                showFee: !state.showFee,
              }))
              }
            >
              <SeeMoreIcon src={seeMoreIcon} alt='Show more icon' />
              <TextComponent value={`${showFee ? 'Hide' : 'Show'} Additional Options`} />
            </ShowFeeButton>
            <HexadecimalWrapper>
              <Checkbox
                onChange={event => this.setState({ isHexMemo: event.target.checked })}
                checked={isHexMemo}
              />
              <HexadecimalText
                onClick={() => this.setState(prevState => ({ isHexMemo: !prevState.isHexMemo }))}
                value='Hexadecimal Memo'
              />
            </HexadecimalWrapper>
          </ActionsWrapper>
          <RevealsMain>
            <Transition
              native
              items={showFee}
              enter={[
                {
                  height: 'auto',
                  opacity: 1,
                  overflow: 'visible',
                },
              ]}
              leave={{ height: 0, opacity: 0 }}
              from={{
                position: 'absolute',
                overflow: 'hidden',
                opacity: 0,
                height: 0,
              }}
            >
              {(show: boolean) => show
                && ((props: Object) => (
                  <animated.div style={props}>
                    <FeeWrapper id='send-fee-wrapper'>
                      <RowComponent alignItems='flex-end' justifyContent='space-between'>
                        <ColumnComponent width='64%'>
                          <Label value='Fee' />
                          <InputComponent
                            type='number'
                            onChange={this.handleChange('fee')}
                            value={String(fee)}
                            disabled={feeType !== FEES.CUSTOM}
                            bgColor={theme.colors.sendAdditionalInputBg}
                            color={theme.colors.sendAdditionalInputText}
                            name='fee'
                          />
                        </ColumnComponent>
                        <ColumnComponent width='35%'>
                          <SelectComponent
                            placement='top'
                            value={String(feeType)}
                            bgColor={theme.colors.sendAdditionalInputBg}
                            onChange={this.handleChangeFeeType}
                            options={Object.keys(FEES).map(cur => ({
                              label: cur.toLowerCase(),
                              value: String(FEES[cur]),
                            }))}
                          />
                        </ColumnComponent>
                      </RowComponent>
                    </FeeWrapper>
                  </animated.div>
                ))
              }
            </Transition>
          </RevealsMain>
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
            showButtons={!isSending && !error && !operationId}
            onClose={this.reset}
            renderTrigger={toggle => (
              <FormButton
                onClick={() => this.showModal(toggle)}
                id='send-submit-button'
                label='Send'
                focused
                isFluid
                disabled={!from || !amount || !to || !fee}
              />
            )}
          >
            {toggle => (
              <ModalContent id='send-confirm-transaction-modal'>
                {this.renderModalContent({
                  valueSent,
                  valueSentInUsd,
                  toggle,
                })}
              </ModalContent>
            )}
          </ConfirmDialogComponent>
          <FormButton label='Clear Form' variant='secondary' />
        </SendWrapper>
      </RowComponent>
    );
  }
}

export const SendView = withTheme(Component);
