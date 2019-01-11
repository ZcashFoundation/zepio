// @flow
import React, { type Node, Component } from 'react';
import styled from 'styled-components';
/* eslint-disable import/no-extraneous-dependencies */
// $FlowFixMe
import { darken } from 'polished';
import Popover from 'react-popover';
import ClickOutside from 'react-click-outside';

import { TextComponent } from './text';

/* eslint-disable max-len  */
const MenuWrapper = styled.div`
  background-image: ${props => `linear-gradient(to right, ${darken(
    0.05,
    props.theme.colors.activeItem,
  )}, ${props.theme.colors.activeItem})`};
  border-radius: ${props => props.theme.boxBorderRadius};
  margin-left: -10px;
  max-width: 400px;
`;

const MenuItem = styled.button`
  outline: none;
  background-color: transparent;
  border: none;
  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme.colors.text};
  border-bottom-width: 1px;
  padding: 15px;
  cursor: pointer;
  font-weight: 700;
  width: 100%;
  text-align: left;

  &:hover {
    opacity: 1;
  }

  &:disabled {
    cursor: default;

    &:hover {
      opacity: 1;
    }
  }

  &:last-child {
    border-bottom: none;
  }
`;

const PopoverWithStyle = styled(Popover)`
  & > .Popover-tip {
    fill: ${props => props.theme.colors.activeItem};
  }
`;

type Props = {
  renderTrigger: (toggleVisibility: () => void, isOpen: boolean) => Node,
  options: Array<{ label: string, onClick: () => void }>,
  label?: string | null,
};

type State = {
  isOpen: boolean,
};

export class DropdownComponent extends Component<Props, State> {
  state = {
    isOpen: false,
  };

  static defaultProps = {
    label: null,
  };

  render() {
    const { isOpen } = this.state;
    const { label, options, renderTrigger } = this.props;

    const body = [
      <ClickOutside
        onClickOutside={() => this.setState(() => ({ isOpen: false }))}
      >
        <MenuWrapper>
          {label && (
            <MenuItem disabled isGroupLabel>
              <TextComponent value={label} isBold />
            </MenuItem>
          )}
          {options.map(({ label: optionLabel, onClick }) => (
            <MenuItem onClick={onClick} key={optionLabel}>
              <TextComponent value={optionLabel} />
            </MenuItem>
          ))}
        </MenuWrapper>
      </ClickOutside>,
    ];

    return (
      <PopoverWithStyle
        isOpen={isOpen}
        preferPlace='below'
        enterExitTransitionDurationMs={0}
        tipSize={7}
        body={body}
      >
        {renderTrigger(
          () => this.setState(state => ({ isOpen: !state.isOpen })),
          isOpen,
        )}
      </PopoverWithStyle>
    );
  }
}
