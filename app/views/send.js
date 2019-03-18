// @flow

import React, { PureComponent } from 'react';
import styled, { withTheme, keyframes } from 'styled-components';
import { BigNumber } from 'bignumber.js';
import { Transition, animated } from 'react-spring';
import { type Match } from 'react-router-dom';

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
import { isHex } from '../utils/is-hex';

import SentIcon from '../assets/images/transaction_sent_icon_dark.svg';
import MenuIconDark from '../assets/images/menu_icon_dark.svg';
import MenuIconLight from '../assets/images/menu_icon_light.svg';
import ValidIcon from '../assets/images/green_check_dark.png';
import InvalidIcon from '../assets/images/error_icon_dark.png';
import LoadingIconDark from '../assets/images/sync_icon_dark.png';
import LoadingIconLight from '../assets/images/sync_icon_light.png';
import ArrowUpIconDark from '../assets/images/arrow_up_dark.png';
import ArrowUpIconLight from '../assets/images/arrow_up_light.png';

import type { MapDispatchToProps, MapStateToProps } from '../containers/send';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
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
    margin-top: 16px;
    margin-left: 15px;
    display: block;
    transition: all 0.05s ease-in-out;
    opacity: ${(props: AmountProps) => (props.isEmpty ? '0' : '1')};
    color: ${props => props.theme.colors.text};
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
  border-radius: ${props => props.theme.boxBorderRadius};
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

const InfoCardSubLabel = styled(TextComponent)`
  opacity: 0.5;
  margin-top: -7px;
  margin-bottom: 10px;
  font-size: 9px;
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
    word-break: break-word;
  }
`;

const ConfirmItemWrapper = styled(RowComponent)`
  padding: 22.5px 40px;
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
    opacity: 1;s
  }
`;

const HexadecimalText = styled(TextComponent)`
  white-space: nowrap;
`;

const SimpleTooltip = styled.div`
  background: ${props => props.theme.colors.walletAddressTooltipBg};
  position: absolute;
  top: -24px;
  left: 0;
  right: 0;
  padding: 6px 10px;
  border-radius: ${props => props.theme.boxBorderRadius};
`;

const TooltipText = styled(TextComponent)`
  color: ${props => props.theme.colors.walletAddressTooltip};
  font-size: 10px;
  font-weight: 700;
  text-align: center;
`;

const SendButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 20px 40px;
`;

const ErrorLabel = styled(TextComponent)`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 16px;
`;

const ErrorMessage = styled(TextComponent)`
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.colors.error};
  text-align: center;
  margin-bottom: 20px;
`;

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Loader = styled.img`
  width: 45px;
  height: 45px;
  animation: 2s linear infinite;
  animation-name: ${rotate};
  margin-bottom: 30px;
`;

const ZSuccessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 40px;
`;

const ZSuccessContentWrapper = styled.div`
  padding: 0 0 40px 0;
`;

const ZSuccessLabel = styled(TextComponent)`
  color: ${props => props.theme.colors.success};
  font-weight: 700;
  font-size: 30px;
`;

const ZSuccessMessage = styled(TextComponent)`
  text-align: center;
  margin-bottom: 40px;
  margin-top: 5px;
`;

const ZSuccessTransactionId = styled(TextComponent)`
  text-align: center;
  word-break: break-all !important;
`;

type Props = {
  match: Match,
  theme: AppTheme,
} & MapStateToProps &
  MapDispatchToProps;

type State = {
  showFee: boolean,
  from: string,
  amount: string,
  to: string,
  feeType: string | number,
  fee: number | null,
  memo: string,
  isHexMemo: boolean,
  showBalanceTooltip: boolean,
};

const initialState: State = {
  showFee: false,
  from: '',
  amount: '',
  to: '',
  feeType: FEES.LOW,
  fee: FEES.LOW,
  memo: '',
  isHexMemo: false,
  showBalanceTooltip: false,
};

class Component extends PureComponent<Props, State> {
  state = initialState;

  componentDidMount() {
    const {
      resetSendView, loadAddresses, loadZECPrice, match,
    } = this.props;

    resetSendView();
    loadAddresses();
    loadZECPrice();

    if (match.params.to) {
      this.handleChange('to')(match.params.to);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const previousToAddress = prevProps.match.params.to;
    const toAddress = this.props.match.params.to; // eslint-disable-line

    if (toAddress && previousToAddress !== toAddress) this.handleChange('to')(toAddress);
  }

  updateTooltipVisibility = ({ balance, amount }: { balance: number, amount: number }) => {
    const { from, to, fee } = this.state;
    const feeValue = fee || 0;

    this.setState({
      showBalanceTooltip: !from || !to ? false : new BigNumber(amount).plus(feeValue).gt(balance),
    });
  };

  getAmountWithFee = () => {
    const { amount, fee } = this.state;

    const feeValue = fee || 0;

    if (!amount) return feeValue;

    return new BigNumber(amount).plus(feeValue).toNumber();
  };

  getMaxAmountWithoutFee = () => {
    const { balance } = this.props;
    const { fee } = this.state;

    const max = new BigNumber(balance).minus(fee || 0);

    return max.isNegative() ? 0 : max.toNumber();
  };

  handleChange = (field: string) => (value: string | number) => {
    const { validateAddress, getAddressBalance, balance } = this.props;
    const { amount } = this.state;

    if (field === 'to') {
      this.setState(
        () => ({ [field]: value }),
        () => {
          validateAddress({ address: String(value) });
          this.updateTooltipVisibility({
            balance,
            amount: new BigNumber(amount).toNumber(),
          });
        },
      );
    } else {
      if (field === 'from') getAddressBalance({ address: String(value) });

      this.setState(
        () => ({ [field]: value }),
        () => {
          if (field === 'fee') this.handleChange('amount')(amount);
          this.updateTooltipVisibility({
            balance,
            amount: new BigNumber(field === 'amount' ? value : amount).toNumber(),
          });
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
    if (feeValue.isEqualTo(FEES.MEDIUM)) return `Medium ZEC ${feeValue.toString()}`;
    if (feeValue.isEqualTo(FEES.HIGH)) return `High ZEC ${feeValue.toString()}`;

    return `Custom ZEC ${feeValue.toString()}`;
  };

  renderValidationStatus = () => {
    const { isToAddressValid, theme } = this.props;

    return isToAddressValid ? (
      <ValidateWrapper alignItems='center'>
        <ValidateStatusIcon src={ValidIcon} />
        <ValidateItemLabel value='VALID' color={theme.colors.transactionReceived(this.props)} />
      </ValidateWrapper>
    ) : (
      <ValidateWrapper alignItems='center'>
        <ValidateStatusIcon src={InvalidIcon} />
        <ValidateItemLabel value='INVALID' color={theme.colors.transactionSent(this.props)} />
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
    const {
      operationId, isSending, error, theme,
    } = this.props;
    const { from, to } = this.state;

    const loadingIcon = theme.mode === DARK ? LoadingIconDark : LoadingIconLight;

    if (isSending) {
      return (
        <LoaderWrapper>
          <Loader src={loadingIcon} />
          <TextComponent value='Processing transaction...' />
        </LoaderWrapper>
      );
    }

    if (operationId) {
      return (
        <ZSuccessWrapper id='send-success-wrapper'>
          <ZSuccessLabel value='Success!' />
          <ZSuccessContentWrapper>
            <ZSuccessMessage value='Your transaction was sent successfully.' />
            <ZSuccessTransactionId value={`Transaction ID: ${operationId}`} />
          </ZSuccessContentWrapper>
          <FormButton
            label='Done'
            variant='primary'
            onClick={() => {
              this.reset();
              toggle();
            }}
          />
        </ZSuccessWrapper>
      );
    }

    if (error) {
      return (
        <ErrorWrapper>
          <ErrorLabel value='Error' />
          <ErrorMessage id='send-error-message' value={error} />
          <FormButton
            label='Try Again'
            variant='primary'
            onClick={() => {
              this.reset();
              toggle();
            }}
          />
        </ErrorWrapper>
      );
    }

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

  shouldDisableSendButton = () => {
    const { balance } = this.props;
    const {
      from, amount, to, fee,
    } = this.state;

    return (
      !from
      || !amount
      || !to
      || !fee
      || new BigNumber(amount).gt(balance)
      || !this.isMemoContentValid()
    );
  };

  isMemoContentValid = () => {
    const { isHexMemo, memo } = this.state;

    if (!memo || !isHexMemo) return true;

    return isHex(memo);
  };

  render() {
    const {
      addresses, balance, zecPrice, isSending, error, operationId, theme,
    } = this.props;
    const {
      showFee,
      from,
      amount,
      to,
      memo,
      fee,
      feeType,
      isHexMemo,
      showBalanceTooltip,
    } = this.state;

    const isEmpty = amount === '';

    const fixedAmount = isEmpty || new BigNumber(amount).eq(0) ? 0 : this.getAmountWithFee();

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
      value: new BigNumber(fixedAmount).times(zecPrice).toNumber(),
      append: 'USD $',
    });

    const seeMoreIcon = theme.mode === DARK ? MenuIconDark : MenuIconLight;

    const arrowUpIcon = theme.mode === DARK ? ArrowUpIconDark : ArrowUpIconLight;

    const isValidMemo = this.isMemoContentValid();

    return (
      <RowComponent id='send-wrapper' justifyContent='space-between'>
        <FormWrapper>
          <Label value='From an address' />
          <SelectComponent
            onChange={this.handleChange('from')}
            value={from}
            placeholder='Select a address'
            options={addresses.map(({ address, balance: addressBalance }) => ({
              label: `${address} (${formatNumber({ append: 'ZEC ', value: addressBalance })})`,
              value: address,
            }))}
            capitalize={false}
          />
          <Label value='Amount' />
          <AmountWrapper isEmpty={isEmpty}>
            <AmountInput
              renderRight={() => (
                <MaxAvailableAmount
                  onClick={() => this.handleChange('amount')(this.getMaxAmountWithoutFee())}
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
          {!isValidMemo && <TextComponent value='Please enter a valid hexadecimal memo' />}
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
                            bgColor={theme.colors.sendAdditionalInputBg(this.props)}
                            color={theme.colors.sendAdditionalInputText(this.props)}
                            name='fee'
                          />
                        </ColumnComponent>
                        <ColumnComponent width='35%'>
                          <SelectComponent
                            placement='top'
                            value={String(feeType)}
                            bgColor={theme.colors.sendAdditionalInputBg(this.props)}
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
              <InfoCardLabel value='Available Funds' />
              <TextComponent value={zecBalance} size={1.25} isBold />
              <InfoCardUSD value={zecBalanceInUsd} size={0.84375} />
            </InfoContent>
            <Divider opacity={0.3} />
            <InfoContent>
              <InfoCardLabel value='Sending' />
              <InfoCardSubLabel value='Includes transaction fees' />
              <TextComponent value={valueSent} size={1.25} isBold />
              <InfoCardUSD value={valueSentInUsd} size={0.84375} />
            </InfoContent>
          </InfoCard>
          <ConfirmDialogComponent
            title='Transaction Status'
            onConfirm={this.handleSubmit}
            showButtons={!isSending && !error && !operationId}
            onClose={this.reset}
            renderTrigger={toggle => (
              <SendButtonWrapper>
                {!showBalanceTooltip ? null : (
                  <SimpleTooltip>
                    <TooltipText value='Not enough funds!' />
                  </SimpleTooltip>
                )}
                <FormButton
                  onClick={() => this.showModal(toggle)}
                  id='send-submit-button'
                  label='Send'
                  variant='primary'
                  focused
                  isFluid
                  disabled={this.shouldDisableSendButton()}
                />
              </SendButtonWrapper>
            )}
          >
            {toggle => (
              <ModalContent id='send-confirm-transaction-modal' width='100%'>
                {this.renderModalContent({
                  valueSent,
                  valueSentInUsd,
                  toggle,
                })}
              </ModalContent>
            )}
          </ConfirmDialogComponent>
          <FormButton label='Clear Form' variant='secondary' onClick={this.reset} />
        </SendWrapper>
      </RowComponent>
    );
  }
}

export const SendView = withTheme(Component);
