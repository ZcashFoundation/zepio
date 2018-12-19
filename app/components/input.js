// @flow
import React from 'react';

import styled from 'styled-components';

const getDefaultStyles = t => styled[t]`
  border-radius: 6px;
  border: none;
  background-color: ${// $FlowFixMe
  props => props.theme.colors.inputBackground};
  color: ${// $FlowFixMe
  props => props.theme.colors.text};
  padding: 15px;
  width: 100%;
  outline: none;
  font-family: ${// $FlowFixMe
  props => props.theme.fontFamily};

  ::placeholder {
    opacity: 0.5;
  }
`;

const Input = getDefaultStyles('input');
const Textarea = getDefaultStyles('textarea');

type Props = {
  inputType?: 'input' | 'textarea',
  value: string,
  onChange: string => void,
  rows?: number,
  disabled?: boolean,
  type?: string,
};

export const InputComponent = ({ inputType, onChange, ...props }: Props) => {
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
};
