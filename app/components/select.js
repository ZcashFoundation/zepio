// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { TextComponent } from './text';
import ChevronUp from '../assets/images/chevron-up.svg';
import ChevronDown from '../assets/images/chevron-down.svg';

import theme from '../theme';

/* eslint-disable max-len */
const SelectWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  border-radius: ${props => props.theme.boxBorderRadius};
  border: none;
  background-color: ${props => props.bgColor || props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.text};
  width: 100%;
  outline: none;
  font-family: ${props => props.theme.fontFamily};
  cursor: pointer;
  position: relative;

  ${props => props.isOpen
    && `border-${props.placement}-left-radius: 0; border-${props.placement}-right-radius: 0;`}
`;
/* eslint-enable max-len */

const ValueWrapper = styled.div`
  width: 95%;
  padding: 13px;
  opacity: ${props => (props.hasValue ? '1' : '0.2')};
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SelectMenuButtonWrapper = styled.div`
  border: none;
  background-color: transparent;
  width: 50px;
  height: 100%;
  padding: 13px;
  border-left: ${props => `1px solid ${props.theme.colors.background}`};
`;
/* eslint-disable max-len */
const SelectMenuButton = styled.button`
  padding: 3px 7px;
  outline: none;
  background-color: transparent;
  border: 1px solid ${props => (props.isOpen ? props.theme.colors.primary : '#29292D')};
  border-radius: 100%;
`;
/* eslint-enable max-len */

const Icon = styled.img`
  width: 10px;
  height: 10px;
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  ${props => `${props.placement}: ${`-${props.optionsAmount * 40}px`}`};
  overflow-y: auto;
`;

const Option = styled.button`
  border: none;
  background: none;
  height: 40px;
  background-color: #5d5d5d;
  cursor: pointer;
  z-index: 99;
  text-transform: capitalize;
  padding: 5px 10px;
  border-bottom: 1px solid #4e4b4b;

  &:hover {
    background-color: ${props => props.theme.colors.background};
  }

  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-bottom: 1px solid transparent;
  }
`;

type Props = {
  value: string,
  options: { value: string, label: string }[],
  placeholder?: string,
  onChange: string => void,
  placement?: 'top' | 'bottom',
  bgColor?: string,
};
type State = {
  isOpen: boolean,
};

export class SelectComponent extends PureComponent<Props, State> {
  state = {
    isOpen: false,
  };

  static defaultProps = {
    placeholder: '',
    placement: 'bottom',
    bgColor: theme.colors.inputBackground,
  };

  onSelect = (value: string) => {
    const { onChange } = this.props;

    this.setState(() => ({ isOpen: false }), () => onChange(value));
  };

  handleClickOutside = (event: Object) => {
    const { isOpen } = this.state;
    if (isOpen && event.target.id !== 'select-options-wrapper') this.setState(() => ({ isOpen: false }));
  };

  getSelectedLabel = (value: string) => {
    const { options } = this.props;
    const option = options.find(opt => opt.value === value);

    if (option) return option.label;
  };

  getSelectIcon = () => {
    const { placement } = this.props;
    const { isOpen } = this.state;

    if (placement === 'top') {
      return !isOpen ? ChevronUp : ChevronDown;
    }

    return !isOpen ? ChevronDown : ChevronUp;
  };

  render() {
    const {
      value, options, placeholder, placement, bgColor,
    } = this.props;
    const { isOpen } = this.state;

    return (
      <SelectWrapper
        data-testid='Select'
        id='select-component'
        isOpen={isOpen}
        placement={placement}
        onClick={() => this.setState(() => ({ isOpen: !isOpen }))}
        bgColor={bgColor}
      >
        <ValueWrapper hasValue={Boolean(value)}>
          {this.getSelectedLabel(value) || placeholder}
        </ValueWrapper>
        <SelectMenuButtonWrapper>
          <SelectMenuButton isOpen={isOpen}>
            <Icon src={this.getSelectIcon()} />
          </SelectMenuButton>
        </SelectMenuButtonWrapper>
        {isOpen && (
          <OptionsWrapper
            id='select-options-wrapper'
            optionsAmount={options.length}
            placement={placement}
          >
            {options.map(({ label, value: optionValue }) => (
              <Option
                id={optionValue}
                key={label + optionValue}
                onClick={() => this.onSelect(optionValue)}
                bgColor={bgColor}
              >
                <TextComponent value={label} />
              </Option>
            ))}
          </OptionsWrapper>
        )}
      </SelectWrapper>
    );
  }
}
