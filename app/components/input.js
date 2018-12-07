// @flow
import React from 'react';

import styled from 'styled-components';

// TODO: Missing styles

const defaultStyles = `
  padding: 10px;
  width: 100%;
  outline: none;
  font-family: ${
  // $FlowFixMe
  props => props.theme.fontFamily
}
`;

const Input = styled.input.attrs({
  type: 'text',
})`
  ${defaultStyles};
`;

const Textarea = styled.textarea`
  ${defaultStyles};
`;

type Props = {
  inputType?: 'input' | 'textarea' | 'dropdown',
  value: string,
  onChange: string => void,
  rows?: number,
  disabled?: boolean,
  type?: string,
};

export const InputComponent = ({ inputType, onChange, ...props }: Props) => {
  const inputTypes = {
    input: () => <Input onChange={evt => onChange(evt.target.value)} {...props} />,
    textarea: () => <Textarea onChange={evt => onChange(evt.target.value)} {...props} />,
    dropdown: () => null,
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
