// @flow
import React from 'react';
import styled from 'styled-components';

import { TextComponent } from './text';
import { RowComponent } from './row';

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.cardBackgroundColor};
  border-radius: 10px;
  width: 100%;
  padding: 30px;
  margin: 10px;
`;

const AllAddresses = styled(TextComponent)`
  margin-bottom: 2.5px;
`;

const ValueBox = styled.div`
  margin-bottom: 15px;
  margin-right: 25px;
`;

const Label = styled(TextComponent)`
  margin: 10px 0;
  margin-left: -15px;
`;

const USDValue = styled(TextComponent)`
  opacity: 0.7;
`;

const ShieldedValue = styled(Label)`
  color: ${props => props.theme.colors.activeItem};
`;

type Props = {
  total: number,
  shielded: number,
  transparent: number,
  dollarValue: number,
};

const formatNumber = number => number.toLocaleString('de-DE');

export const WalletSummaryComponent = ({
  total, shielded, transparent, dollarValue,
}: Props) => (
  <Wrapper>
    <AllAddresses value='ALL ADDRESSES' isBold />
    <ValueBox>
      <TextComponent size='3em' value={`ZEC ${formatNumber(total)}`} isBold />
      <USDValue value={`USD $${formatNumber(total * dollarValue)}`} size='2em' />
    </ValueBox>
    <RowComponent>
      <ValueBox>
        <ShieldedValue value='&#9679; SHIELDED' isBold />
        <TextComponent value={`ZEC ${formatNumber(shielded)}`} isBold size='1.3em' />
        <USDValue value={`USD $${formatNumber(shielded * dollarValue)}`} size='1.3em' />
      </ValueBox>
      <ValueBox>
        <Label value='&#9679; TRANSPARENT' isBold />
        <TextComponent value={`ZEC ${formatNumber(transparent)}`} isBold size='1.3em' />
        <USDValue value={`USD $${formatNumber(transparent * dollarValue)}`} size='1.3em' />
      </ValueBox>
    </RowComponent>
  </Wrapper>
);
