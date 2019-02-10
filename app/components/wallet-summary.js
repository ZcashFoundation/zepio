// @flow

import React from 'react';
import styled from 'styled-components';

import { TextComponent } from './text';
import { RowComponent } from './row';

import { formatNumber } from '../utils/format-number';

import { appTheme } from '../theme';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.cardBackgroundColor};
  border-radius: ${props => props.theme.boxBorderRadius};
  padding: 37px 45px;
  min-height: 250px;
  position: relative;
  margin-top: ${props => props.theme.layoutContentPaddingTop};
`;

const AllAddresses = styled(TextComponent)`
  margin-bottom: 2.5px;
  font-size: ${props => `${props.theme.fontSize.small}em`};
`;

const ValueBox = styled.div`
  margin-bottom: 15px;
  margin-right: 25px;
`;

const Label = styled(TextComponent)`
  margin-top: 10px;
  margin-bottom: 5px;
  margin-left: -7.5px;
`;

const USDValue = styled(TextComponent)`
  opacity: 0.5;
  font-weight: ${props => String(props.theme.fontWeight.light)};
`;

const ShieldedValue = styled(Label)`
  color: ${props => props.theme.colors.activeItem};
`;

type Props = {
  total: number,
  shielded: number,
  transparent: number,
  zecPrice: number,
};

export const WalletSummaryComponent = ({
  total, shielded, transparent, zecPrice,
}: Props) => (
  <Wrapper>
    <AllAddresses value='ALL ADDRESSES' isBold />
    <ValueBox>
      <TextComponent
        size={appTheme.fontSize.medium * 2.5}
        value={`ZEC ${formatNumber({ value: total })}`}
        isBold
      />
      <USDValue
        value={`USD $${formatNumber({ value: total * zecPrice })}`}
        size={appTheme.fontSize.medium * 2}
      />
    </ValueBox>
    <RowComponent>
      <ValueBox>
        <ShieldedValue value='&#9679; SHIELDED' isBold size={appTheme.fontSize.small} />
        <TextComponent
          value={`ZEC ${formatNumber({ value: shielded })}`}
          isBold
          size={appTheme.fontSize.medium}
        />
        <USDValue value={`USD $${formatNumber({ value: shielded * zecPrice })}`} />
      </ValueBox>
      <ValueBox>
        <Label value='&#9679; TRANSPARENT' isBold size={appTheme.fontSize.small} />
        <TextComponent
          value={`ZEC ${formatNumber({ value: transparent })}`}
          isBold
          size={appTheme.fontSize.medium}
        />
        <USDValue value={`USD $${formatNumber({ value: transparent * zecPrice })}`} />
      </ValueBox>
    </RowComponent>
  </Wrapper>
);
