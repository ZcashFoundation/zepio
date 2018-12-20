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
  padding: 10px 0;
  border-radius: 10px;
  margin-left: -10px;
`;

const MenuItem = styled.button`
  outline: none;
  background-color: transparent;
  border: none;
  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme.colors.text};
  border-bottom-width: 1px;
  padding: 15px 10px;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    cursor: default;

    &:hover {
      opacity: 1;
    }
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

    return (
      <PopoverWithStyle
        isOpen={isOpen}
        preferPlace='below'
        enterExitTransitionDurationMs={0}
        body={[
          <ClickOutside
            onClickOutside={() => this.setState(() => ({ isOpen: false }))}
          >
            <MenuWrapper>
              {label && (
                <MenuItem disabled>
                  <TextComponent value={label} isBold />
                </MenuItem>
              )}
              {options.map(({ label: optionLabel, onClick }) => (
                <MenuItem onClick={onClick}>
                  <TextComponent value={optionLabel} />
                </MenuItem>
              ))}
            </MenuWrapper>
          </ClickOutside>,
        ]}
        tipSize={7}
      >
        {renderTrigger(
          () => this.setState(state => ({ isOpen: !state.isOpen })),
          isOpen,
        )}
      </PopoverWithStyle>
    );
  }
}
