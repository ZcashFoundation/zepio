// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { TextComponent } from './text';
import ChevronUp from '../assets/images/chevron-up.svg';
import ChevronDown from '../assets/images/chevron-down.svg';

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 6px;
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
`;

const ValueWrapper = styled.div`
  width: 95%;
  padding: 15px;
  opacity: ${props => (props.hasValue ? '1' : '0.2')};
`;

const SelectMenuButtonWrapper = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  background-color: transparent;
  width: 50px;
  height: 100%;
  padding: 15px;
  border-left: ${props => `1px solid ${props.theme.colors.background}`};
`;
/* eslint-disable max-len */
const SelectMenuButton = styled.button`
  outline: none;
  background-color: transparent;
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 100%;
  box-shadow: ${props => `0px 0px 10px 0px ${props.theme.colors.selectButtonShadow}`};
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
  bottom: ${props => `-${props.optionsAmount * 60}px`};
`;

const Option = styled.button`
  border: none;
  background: none;
  height: 60px;
  background-color: ${props => props.theme.colors.inputBackground};
  cursor: pointer;
  z-index: 99;

  &:hover {
    background-color: ${props => props.theme.colors.background};
  }
`;

type Props = {
  value: string,
  options: { value: string, label: string }[],
  placeholder?: string,
  onChange: string => void,
};
type State = {
  isOpen: boolean,
};

export class SelectComponent extends PureComponent<Props, State> {
  state = {
    isOpen: false,
  };

  static defaultProps = {
    placeholder: null,
  };

  onSelect = (value: string) => {
    const { onChange } = this.props;

    this.setState(() => ({ isOpen: false }), () => onChange(value));
  };

  handleClickOutside = (event: Object) => {
    const { isOpen } = this.state;
    if (isOpen && event.target.id !== 'select-options-wrapper') this.setState(() => ({ isOpen: false }));
  };

  render() {
    const { value, options, placeholder } = this.props;
    const { isOpen } = this.state;

    return (
      <SelectWrapper onClick={() => this.setState(() => ({ isOpen: !isOpen }))}>
        <ValueWrapper hasValue={Boolean(value)}>
          {value || placeholder}
        </ValueWrapper>
        <SelectMenuButtonWrapper>
          <SelectMenuButton>
            <Icon src={isOpen ? ChevronUp : ChevronDown} />
          </SelectMenuButton>
        </SelectMenuButtonWrapper>
        {isOpen && (
          <OptionsWrapper
            id='select-options-wrapper'
            optionsAmount={options.length}
          >
            {options.map(({ label, value: optionValue }) => (
              <Option onClick={() => this.onSelect(optionValue)}>
                <TextComponent value={label} />
              </Option>
            ))}
          </OptionsWrapper>
        )}
      </SelectWrapper>
    );
  }
}
