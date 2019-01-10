// @flow
import React from 'react';
import styled from 'styled-components';

import { TextComponent } from './text';
import { RowComponent } from './row';
import { DropdownComponent } from './dropdown';
import MenuIcon from '../assets/images/menu_icon.svg';

import formatNumber from '../utils/formatNumber';

import theme from '../theme';

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
  font-weight: ${props => props.theme.fontWeight.light};
`;

const ShieldedValue = styled(Label)`
  color: ${props => props.theme.colors.activeItem};
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
  position: absolute;
  right: 10px;
  top: 10px;

  &:hover {
    border-color: ${props => props.theme.colors.activeItem};
  }
`;

const SeeMoreIcon = styled.img`
  width: 25px;
  height: 25px;
`;

type Props = {
  total: number,
  shielded: number,
  transparent: number,
  zecPrice: number,
  addresses: string[],
};

export const WalletSummaryComponent = ({
  total,
  shielded,
  transparent,
  zecPrice,
  addresses,
}: Props) => (
  <Wrapper>
    <DropdownComponent
      label='All Addresses'
      renderTrigger={(toggleVisibility, isOpen) => (
        <SeeMoreButton onClick={toggleVisibility} isOpen={isOpen}>
          <SeeMoreIcon src={MenuIcon} alt='Menu Icon' />
        </SeeMoreButton>
      )}
      options={addresses.map(addr => ({ label: addr, onClick: x => x }))}
    />
    <AllAddresses value='ALL ADDRESSES' isBold />
    <ValueBox>
      <TextComponent
        size={theme.fontSize.medium * 2.5}
        value={`ZEC ${formatNumber({ value: total })}`}
        isBold
      />
      <USDValue
        value={`USD $${formatNumber({ value: total * zecPrice })}`}
        size={theme.fontSize.medium * 2}
      />
    </ValueBox>
    <RowComponent>
      <ValueBox>
        <ShieldedValue
          value='&#9679; SHIELDED'
          isBold
          size={theme.fontSize.small}
        />
        <TextComponent
          value={`ZEC ${formatNumber({ value: shielded })}`}
          isBold
          size={theme.fontSize.medium}
        />
        <USDValue
          value={`USD $${formatNumber({ value: shielded * zecPrice })}`}
        />
      </ValueBox>
      <ValueBox>
        <Label value='&#9679; TRANSPARENT' isBold size={theme.fontSize.small} />
        <TextComponent
          value={`ZEC ${formatNumber({ value: transparent })}`}
          isBold
          size={theme.fontSize.medium}
        />
        <USDValue
          value={`USD $${formatNumber({ value: transparent * zecPrice })}`}
        />
      </ValueBox>
    </RowComponent>
  </Wrapper>
);
