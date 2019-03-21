// @flow

import React, { PureComponent } from 'react';
import styled, { withTheme } from 'styled-components';

import { DARK, LIGHT } from '../constants/themes';

import { TextComponent } from './text';

import ChevronUpLight from '../assets/images/chevron_up_icon_light.svg';
import ChevronUpDark from '../assets/images/chevron_up_icon_dark.svg';
import ChevronDownLight from '../assets/images/chevron_down_icon_light.svg';
import ChevronDownDark from '../assets/images/chevron_down_icon_dark.svg';

import { appTheme } from '../theme';

/* eslint-disable max-len */
type SelectWrapperProps = PropsWithTheme<{
  bgColor: ?string,
  isOpen: boolean,
  placement: string,
}>;

const SelectWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  border-radius: ${(props: SelectWrapperProps) => props.theme.boxBorderRadius};
  border: 1px solid ${(props: SelectWrapperProps) => props.theme.colors.inputBorder};
  background-color: ${(props: SelectWrapperProps) => props.bgColor || props.theme.colors.inputBg};
  color: ${(props: SelectWrapperProps) => props.theme.colors.text};
  width: 100%;
  outline: none;
  font-family: ${(props: SelectWrapperProps) => props.theme.fontFamily};
  cursor: pointer;
  position: relative;

  ${(props: SelectWrapperProps) => (props.isOpen
    ? `border-${String(props.placement)}-left-radius: 0; border-${String(
      props.placement,
    )}-right-radius: 0;`
    : '')}
`;
/* eslint-enable max-len */

const ValueWrapper = styled.div`
  width: 95%;
  padding: 13px;
  opacity: ${(props: PropsWithTheme<{ hasValue: boolean }>) => (props.hasValue ? '1' : '0.2')};
  text-transform: ${(props: PropsWithTheme<{ capitalize: boolean }>) => (props.capitalize ? 'capitalize' : 'none')};
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
  border-radius: 100%;
  cursor: pointer;
  border: 1px solid
    ${(props: PropsWithTheme<{ isOpen: boolean }>) => (props.isOpen
    ? props.theme.colors.dropdownOpenedIconBorder
    : props.theme.colors.dropdownIconBorder)};
`;

const Icon = styled.img`
  width: 10px;
  height: 10px;
`;

const Value = styled(TextComponent)`
  white-space: nowrap;
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 55px;
  z-index: 99;
  width: 100.5%;
  margin-left: -0.25%;
  background-color: ${props => props.theme.colors.dropdownBg};
  border-radius: ${props => props.theme.colors.boxBorderRadius};
  border: 1px solid ${props => props.theme.colors.inputBorder};
  ${(props: PropsWithTheme<{ placement: string, optionsAmount: number }>) => `${String(props.placement)}: ${`-${String((props.optionsAmount || 0) * 40 + 10)}px`}`};
  overflow-y: auto;
  box-shadow: 1px 3px 20px rgba(16, 19, 20, 0.1);
  max-height: 65vh;
`;

const Option = styled.button`
  border: none;
  background: none;
  min-height: 40px;
  background-color: ${props => props.theme.colors.dropdownBg};
  cursor: pointer;
  z-index: 99;
  text-transform: ${(props: PropsWithTheme<{ capitalize: boolean }>) => (props.capitalize ? 'capitalize' : 'none')};
  padding: 5px 10px;
  border-bottom: 1px solid ${props => props.theme.colors.dropdownBorder};

  &:hover {
    background-color: ${props => props.theme.colors.dropdownHoveredBg};
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
  capitalize?: boolean,
  theme: AppTheme,
};

type State = {
  isOpen: boolean,
};

class Component extends PureComponent<Props, State> {
  state = {
    isOpen: false,
  };

  static defaultProps = {
    placeholder: '',
    placement: 'bottom',
    bgColor: appTheme.colors.inputBg,
    capitalize: true,
  };

  onSelect = (value: string) => {
    const { onChange } = this.props;

    this.setState(() => ({ isOpen: false }), () => onChange(value));
  };

  handleClickOutside = (event: Object) => {
    const { isOpen } = this.state;

    if (isOpen && event.target.id !== 'select-options-wrapper') {
      this.setState(() => ({ isOpen: false }));
    }
  };

  getSelectedLabel = (value: string) => {
    const { options } = this.props;
    const option = options.find(opt => opt.value === value);

    if (option) return option.label;
  };

  getSelectIcon = () => {
    const { placement, theme } = this.props;
    const { isOpen } = this.state;

    if (theme.mode === DARK) {
      if (placement === 'top') {
        return !isOpen ? ChevronUpDark : ChevronDownDark;
      }

      return !isOpen ? ChevronDownDark : ChevronUpDark;
    }

    if (theme.mode === LIGHT) {
      if (placement === 'top') {
        return !isOpen ? ChevronUpLight : ChevronDownLight;
      }

      return !isOpen ? ChevronDownLight : ChevronUpLight;
    }
  };

  render() {
    const { isOpen } = this.state;
    const {
      value, options, placeholder, placement, bgColor, capitalize,
    } = this.props;

    return (
      <SelectWrapper
        data-testid='Select'
        id='select-component'
        isOpen={isOpen}
        placement={placement}
        onClick={() => this.setState(() => ({ isOpen: !isOpen }))}
        bgColor={bgColor}
      >
        <ValueWrapper hasValue={Boolean(value)} capitalize={capitalize}>
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
                capitalize={capitalize}
              >
                <Value value={label} />
              </Option>
            ))}
          </OptionsWrapper>
        )}
      </SelectWrapper>
    );
  }
}

export const SelectComponent = withTheme(Component);
