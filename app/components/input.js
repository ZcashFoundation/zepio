// @flow
/* eslint-disable max-len */
import React, { type Element } from 'react';
import styled from 'styled-components';

import { appTheme } from '../theme';

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
  renderRight?: () => Element<*> | null,
  bgColor?: string,
};

type DefaultStylesProps = PropsWithTheme<{
  bgColor: ?string,
  withRightElement: boolean,
}>;

// $FlowFixMe
const getDefaultStyles: ($PropertyType<Props, 'inputType'>) => Element<*> = t => styled[t]`
  border-radius: ${(props: DefaultStylesProps) => props.theme.boxBorderRadius};
  border: none;
  background-color: ${(props: DefaultStylesProps) => props.bgColor || props.theme.colors.inputBg};
  color: ${(props: DefaultStylesProps) => props.theme.colors.text};
  padding: 15px;
  padding-right: ${(props: DefaultStylesProps) => (props.withRightElement ? '85px' : '15px')};
  width: 100%;
  outline: none;
  font-family: ${(props: DefaultStylesProps) => props.theme.fontFamily};
  border: 1px solid ${(props: DefaultStylesProps) => props.theme.colors.inputBorder};

  ::placeholder {
    opacity: 0.5;
  }

  &:focus,
  &:active {
    border-color: ${(props: DefaultStylesProps) => props.theme.colors.inputBorderActive};
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

const RightElement = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const Input = getDefaultStyles('input');
const Textarea = getDefaultStyles('textarea');

export const InputComponent = ({
  inputType,
  bgColor,
  onChange = () => {},
  renderRight = () => null,
  ...props
}: Props) => {
  const rightElement = renderRight();
  const inputTypes = {
    input: () => (
      <Input
        onChange={evt => onChange(evt.target.value)}
        withRightElement={Boolean(rightElement)}
        bgColor={bgColor}
        data-testid='Input'
        {...props}
      />
    ),
    textarea: () => (
      <Textarea
        onChange={evt => onChange(evt.target.value)}
        bgColor={bgColor}
        data-testid='Textarea'
        {...props}
      />
    ),
  };

  if (!Object.keys(inputTypes).find(key => key === inputType)) {
    throw new Error(`Invalid input type: ${String(inputType)}`);
  }

  return (
    <Wrapper>
      {inputTypes[inputType || 'input']()}
      {rightElement && <RightElement>{rightElement}</RightElement>}
    </Wrapper>
  );
};

InputComponent.defaultProps = {
  inputType: 'input',
  rows: 4,
  disabled: false,
  type: 'text',
  name: '',
  renderRight: () => null,
  onChange: () => {},
  onFocus: () => {},
  step: 1,
  bgColor: appTheme.colors.inputBg,
};
