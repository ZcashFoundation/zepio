// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { TextComponent } from './text';
import ChevronUp from '../assets/images/chevron-up.svg';
import ChevronDown from '../assets/images/chevron-down.svg';

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: ${props => props.theme.boxBorderRadius};
  border: none;
  background-color: ${// $FlowFixMe
  props => props.theme.colors.inputBackground};
  color: ${// $FlowFixMe
  props => props.theme.colors.text};
  width: 100%;
  outline: none;
  font-family: ${// $FlowFixMe
  props => props.theme.fontFamily};
  cursor: pointer;
  position: relative;

  ${props => props.isOpen
    && `border-${props.placement}-left-radius: 0; border-${
      props.placement
    }-right-radius: 0;`}
`;

const ValueWrapper = styled.div`
  width: 95%;
  padding: 13px;
  opacity: ${props => (props.hasValue ? '1' : '0.2')};
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SelectMenuButtonWrapper = styled.button`
  cursor: pointer;
  outline: none;
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
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 100%;
  box-shadow: ${props => `0px 0px 10px 0px ${
    props.theme.colors.selectButtonShadow
  }, 0px 0px 10px 0px ${props.theme.colors.selectButtonShadow} inset`};
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
  ${props => `${props.placement}: ${`-${props.optionsAmount * 60}px`}`};
`;

const Option = styled.button`
  border: none;
  background: none;
  height: 60px;
  background-color: ${props => props.theme.colors.inputBackground};
  cursor: pointer;
  z-index: 99;
  text-transform: capitalize;

  &:hover {
    background-color: ${props => props.theme.colors.background};
  }
`;

type Props = {
  value: string,
  options: { value: string, label: string }[],
  placeholder?: string,
  onChange: string => void,
  placement?: 'top' | 'bottom',
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

    if (placement === 'bottom') {
      return isOpen ? ChevronUp : ChevronDown;
    }

    return isOpen ? ChevronDown : ChevronUp;
  };

  render() {
    const {
      value, options, placeholder, placement,
    } = this.props;
    const { isOpen } = this.state;

    return (
      <SelectWrapper
        isOpen={isOpen}
        placement={placement}
        onClick={() => this.setState(() => ({ isOpen: !isOpen }))}
      >
        <ValueWrapper hasValue={Boolean(value)}>
          {this.getSelectedLabel(value) || placeholder}
        </ValueWrapper>
        <SelectMenuButtonWrapper>
          <SelectMenuButton>
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
                key={label + optionValue}
                onClick={() => this.onSelect(optionValue)}
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
