// @flow
import React from 'react';

import styled from 'styled-components';

// TODO: Missing styles

const defaultStyles = `
  padding: 10px;
  width: 100%;
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
  if (inputType === 'input') {
    return <Input onChange={evt => onChange(evt.target.value)} {...props} />;
  }

  if (inputType === 'textarea') {
    return <Textarea onChange={evt => onChange(evt.target.value)} {...props} />;
  }

  // TODO: Dropdown component
  return null;
};

InputComponent.defaultProps = {
  inputType: 'input',
  rows: 4,
  disabled: false,
  type: 'text',
};
