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

type Props = {};
type State = {
  showFee: boolean,
  from: string,
  amount: number,
  to: string,
  feeType: string | number,
  fee: number | null,
  memo: string,
};

export class SendView extends PureComponent<Props, State> {
  state = {
    showFee: false,
    from: '',
    amount: 0,
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

  render() {
    const {
      showFee, from, amount, to, memo, fee, feeType,
    } = this.state;

    return (
      <RowComponent justifyContent='space-between'>
        <FormWrapper>
          <InputLabelComponent value='From' />
          <SelectComponent
            onChange={this.handleChange('from')}
            value={from}
            placeholder='Select a address'
            options={[
              {
                label: 'kjnasG86431nvtsa…ks345jbhbdsDGvds',
                value: 'kjnasG86431nvtsa…ks345jbhbdsDGvds',
              },
              {
                label: 'kjnasG8643asd12e45jbhbdsDGvds',
                value: 'kjnasG8643asd12e45jbhbdsDGvds',
              },
            ]}
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
        </FormWrapper>
        <SendWrapper>
          <InfoCard>
            <InfoContent>
              <InfoCardLabel value='Available Funds:' />
              <TextComponent value='ZEC 2.235' size={1.125} isBold />
              <InfoCardUSD value='USD $25.000,00' />
            </InfoContent>
            <Divider opacity={0.5} />
            <InfoContent>
              <InfoCardLabel value='Sending' />
              <TextComponent value='ZEC 0' size={1.125} isBold />
              <InfoCardUSD value='USD $0.00' />
            </InfoContent>
          </InfoCard>
          <FormButton label='Send' variant='secondary' focused />
          <FormButton label='Cancel' variant='secondary' />
        </SendWrapper>
      </RowComponent>
    );
  }
}
