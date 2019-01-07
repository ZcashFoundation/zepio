// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import FEES from '../constants/fees';

import { InputLabelComponent } from '../components/input-label';
import { InputComponent } from '../components/input';
import { TextComponent } from '../components/text';
import { SelectComponent } from '../components/select';
import { RowComponent } from '../components/row';
import { ColumnComponent } from '../components/column';
import { Divider } from '../components/divider';
import { Button } from '../components/button';

import formatNumber from '../utils/formatNumber';

import type { SendTransactionInput } from '../containers/send';

const FormWrapper = styled.div`
  margin-top: ${props => props.theme.layoutContentPaddingTop};
  width: 80%;
`;

const SendWrapper = styled(ColumnComponent)`
  margin-top: 60px;
  width: 15%;
`;

const ShowFeeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  color: ${props => props.theme.colors.text};
  outline: none;

  &:hover {
    text-decoration: underline;
  }
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

type Props = {
  balance: number,
  zecPrice: number,
  addresses: string[],
  sendTransaction: SendTransactionInput => void,
  // error: string | null,
  isSending: boolean,
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

export class SendView extends PureComponent<Props, State> {
  state = {
    showFee: false,
    from: '',
    amount: '0',
    to: '',
    feeType: FEES.LOW,
    fee: FEES.LOW,
    memo: '',
  };

  handleChange = (field: string) => (value: string) => {
    this.setState(() => ({
      [field]: value,
    }));
  };

  handleChangeFeeType = (value: string) => {
    this.setState(
      {
        feeType: value,
        fee: null,
      },
      () => {
        if (
          value === String(FEES.LOW)
          || value === String(FEES.MEDIUM)
          || value === String(FEES.HIGH)
        ) {
          this.setState(() => ({
            fee: Number(value),
          }));
        }
      },
    );
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

  render() {
    const {
      addresses, balance, zecPrice, isSending,
    } = this.props;
    const {
      showFee, from, amount, to, memo, fee, feeType,
    } = this.state;

    const zecBalance = formatNumber({ value: balance, append: 'ZEC ' });
    const zecBalanceInUsd = formatNumber({
      value: balance * zecPrice,
      append: 'USD $',
    });
    const valueSent = formatNumber({
      value: Number.parseFloat(amount),
      append: 'ZEC ',
    });
    const valueSentInUsd = formatNumber({
      value: Number.parseFloat(amount) * zecPrice,
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
          <InputComponent
            type='number'
            onChange={this.handleChange('amount')}
            value={String(amount)}
            placeholder='kjnasG86431nvtsa…ks345jbhbdsDGvds'
          />
          <InputLabelComponent value='To' />
          <InputComponent
            onChange={this.handleChange('to')}
            value={to}
            placeholder='kjnasG86431nvtsa…ks345jbhbdsDGvds'
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
            <TextComponent
              value={`${showFee ? 'Hide' : 'Show'} Additional Options`}
              align='right'
            />
          </ShowFeeButton>
          {showFee && (
            <RowComponent alignItems='flex-end' justifyContent='space-between'>
              <ColumnComponent width='74%'>
                <InputLabelComponent value='Fee' />
                <InputComponent
                  type='number'
                  onChange={this.handleChange('fee')}
                  value={String(fee)}
                  disabled={feeType !== FEES.CUSTOM}
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
                />
              </ColumnComponent>
            </RowComponent>
          )}
          {feeType === FEES.CUSTOM && (
            <TextComponent value='Custom fees may compromise your privacy since fees are transparent' />
          )}
        </FormWrapper>
        <SendWrapper>
          <InfoCard>
            <InfoContent>
              <InfoCardLabel value='Available Funds:' />
              <TextComponent value={zecBalance} size={1.125} isBold />
              <InfoCardUSD value={zecBalanceInUsd} />
            </InfoContent>
            <Divider opacity={0.5} />
            <InfoContent>
              <InfoCardLabel value='Sending' />
              <TextComponent value={valueSent} size={1.125} isBold />
              <InfoCardUSD value={valueSentInUsd} />
            </InfoContent>
          </InfoCard>
          <FormButton
            label='Send'
            variant='secondary'
            focused
            onClick={this.handleSubmit}
            isLoading={isSending}
          />
          <FormButton label='Cancel' variant='secondary' />
        </SendWrapper>
      </RowComponent>
    );
  }
}
