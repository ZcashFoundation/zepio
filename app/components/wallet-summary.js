// @flow

import React from 'react';
import styled, { withTheme } from 'styled-components';

import { TextComponent } from './text';
import { RowComponent } from './row';

import { formatNumber } from '../utils/format-number';
import { getCoinName } from '../utils/get-coin-name';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.walletSummaryBg};
  border: 1px solid ${props => props.theme.colors.walletSummaryBorder};
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
  unconfirmed: number,
  zecPrice: number,
  theme: AppTheme,
};

export const Component = ({
  total,
  shielded,
  transparent,
  unconfirmed,
  zecPrice,
  theme,
}: Props) => {
  const coinName = getCoinName();
  return (
    <Wrapper>
      <AllAddresses value='ALL ADDRESSES' isBold />
      <ValueBox>
        <TextComponent
          size={theme.fontSize.medium * 2.5}
          value={`${coinName} ${formatNumber({ value: total })}`}
          isBold
        />
        <USDValue
          value={`USD $${formatNumber({ value: total * zecPrice })}`}
          size={theme.fontSize.medium * 2}
        />
      </ValueBox>
      <RowComponent>
        <ValueBox>
          <ShieldedValue value='&#9679; SHIELDED' isBold size={theme.fontSize.small} />
          <TextComponent
            value={`${coinName} ${formatNumber({ value: shielded })}`}
            isBold
            size={theme.fontSize.medium}
          />
          <USDValue value={`USD $${formatNumber({ value: shielded * zecPrice })}`} />
        </ValueBox>
        <ValueBox>
          <Label value='&#9679; TRANSPARENT' isBold size={theme.fontSize.small} />
          <TextComponent
            value={`${coinName} ${formatNumber({ value: transparent })}`}
            isBold
            size={theme.fontSize.medium}
          />
          <USDValue value={`USD $${formatNumber({ value: transparent * zecPrice })}`} />
        </ValueBox>
        <ValueBox>
          <Label value='&#9679; UNCONFIRMED' isBold size={theme.fontSize.small} />
          <TextComponent
            value={`${coinName} ${formatNumber({ value: unconfirmed })}`}
            isBold
            size={theme.fontSize.medium}
          />
          <USDValue value={`USD $${formatNumber({ value: unconfirmed * zecPrice })}`} />
        </ValueBox>
      </RowComponent>
    </Wrapper>
  );
};

export const WalletSummaryComponent = withTheme(Component);
