// @flow
import React from 'react';
import styled from 'styled-components';
import { IoIosMore } from 'react-icons/io';

import { TextComponent } from './text';
import { RowComponent } from './row';
import { DropdownComponent } from './dropdown';

import theme from '../theme';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.cardBackgroundColor};
  border-radius: 5px;
  padding: 37px 45px;
  margin-top: 20px;
  position: relative;
`;

const AllAddresses = styled(TextComponent)`
  margin-bottom: 2.5px;
  font-size: 0.625em;
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
`;

const ShieldedValue = styled(Label)`
  color: ${props => props.theme.colors.activeItem};
`;

const SeeMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border-radius: 100%;
  border-width: 1px;
  border-color: ${props => (props.isOpen ? props.theme.colors.activeItem : props.theme.colors.text)};
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

type Props = {
  total: number,
  shielded: number,
  transparent: number,
  dollarValue: number,
  addresses: string[],
};

const formatNumber = number => number.toLocaleString('de-DE');

export const WalletSummaryComponent = ({
  total, shielded, transparent, dollarValue, addresses,
}: Props) => (
  <Wrapper>
    <DropdownComponent
      label='All Addresses'
      renderTrigger={(toggleVisibility, isOpen) => (
        <SeeMoreButton onClick={toggleVisibility} isOpen={isOpen}>
          <IoIosMore color={theme.colors.text} size={15} />
        </SeeMoreButton>
      )}
      options={addresses.map(addr => ({ label: addr, onClick: x => x }))}
    />
    <AllAddresses value='ALL ADDRESSES' isBold />
    <ValueBox>
      <TextComponent size='2.625em' value={`ZEC ${formatNumber(total)}`} isBold />
      <USDValue value={`USD $${formatNumber(total * dollarValue)}`} size='1.750em' />
    </ValueBox>
    <RowComponent>
      <ValueBox>
        <ShieldedValue value='&#9679; SHIELDED' isBold size='0.625em' />
        <TextComponent value={`ZEC ${formatNumber(shielded)}`} isBold size='1.125em' />
        <USDValue value={`USD $${formatNumber(shielded * dollarValue)}`} size='0.750em' />
      </ValueBox>
      <ValueBox>
        <Label value='&#9679; TRANSPARENT' isBold size='0.625em' />
        <TextComponent value={`ZEC ${formatNumber(transparent)}`} isBold size='1.125em' />
        <USDValue value={`USD $${formatNumber(transparent * dollarValue)}`} size='0.750em' />
      </ValueBox>
    </RowComponent>
  </Wrapper>
);
