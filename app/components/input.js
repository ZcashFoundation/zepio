// @flow
import React from 'react';

import styled from 'styled-components';

const getDefaultStyles = t => styled[t]`
  border-radius: ${props => props.theme.boxBorderRadius};
  border: none;
  background-color: ${props => props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.text};
  padding: 15px;
  width: 100%;
  outline: none;
  font-family: ${props => props.theme.fontFamily};

  ::placeholder {
    opacity: 0.5;
  }
`;

const Input = getDefaultStyles('input');
const Textarea = getDefaultStyles('textarea');

type Props = {
  inputType?: 'input' | 'textarea',
  value: string,
  onChange?: string => void,
  onFocus?: (SyntheticFocusEvent<HTMLInputElement>) => void,
  rows?: number,
  disabled?: boolean,
  type?: string,
  step?: number,
  name?: string,
};

export const InputComponent = ({
  inputType,
  onChange = () => {},
  ...props
}: Props) => {
  const inputTypes = {
    input: () => (
      <Input onChange={evt => onChange(evt.target.value)} {...props} />
    ),
    textarea: () => (
      <Textarea onChange={evt => onChange(evt.target.value)} {...props} />
    ),
  };

  if (!Object.keys(inputTypes).find(key => key === inputType)) {
    throw new Error(`Invalid input type: ${String(inputType)}`);
  }

  return inputTypes[inputType || 'input']();
};

InputComponent.defaultProps = {
  inputType: 'input',
  rows: 4,
  disabled: false,
  type: 'text',
  name: '',
};
