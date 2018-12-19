// @flow
import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';

import { InputLabelComponent } from '../components/input-label';
import { InputComponent } from '../components/input';
import { TextComponent } from '../components/text';
import { SelectComponent } from '../components/select';

const Wrapper = styled.div`
  margin-top: ${props => props.theme.layoutContentPaddingTop};
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

type Props = {};
type State = {
  showFee: boolean,
  from: string,
  amount: number,
  to: string,
  fee: number,
  memo: string,
};

export class SendView extends PureComponent<Props, State> {
  state = {
    showFee: false,
    from: '',
    amount: 0,
    to: '',
    fee: 0,
    memo: '',
  };

  handleChange = (field: string) => (value: string) => {
    this.setState(() => ({
      [field]: value,
    }));
  };

  render() {
    const {
      showFee, from, amount, to, memo, fee,
    } = this.state;

    return (
      <Wrapper>
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
          placeholder='kjnasG86431nvtsa…ks345jbhbdsDGvds'
        />

        <ShowFeeButton
          onClick={() => this.setState(state => ({ showFee: !state.showFee }))}
        >
          <TextComponent
            value={`${showFee ? 'Hide' : 'Show'} Additional Options`}
            align='right'
          />
        </ShowFeeButton>

        {showFee && (
          <Fragment>
            <InputLabelComponent value='Fee' />
            <InputComponent
              type='number'
              onChange={this.handleChange('fee')}
              value={String(fee)}
              placeholder='kjnasG86431nvtsa…ks345jbhbdsDGvds'
            />
          </Fragment>
        )}
      </Wrapper>
    );
  }
}
