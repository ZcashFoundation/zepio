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
  background-image: ${props => `linear-gradient(to right, ${darken(0.005, props.theme.colors.activeItem)}, ${props.theme.colors.activeItem})`};
  padding: 10px;
  border-radius: 10px;
  position: absolute;
  margin-left: -10px;
  min-width: 200px;
`;

const MenuItem = styled.button`
  outline: none;
  background-color: transparent;
  border: none;
  border-bottom-style: solid;
  border-bottom-color: ${props => props.theme.colors.text};
  border-bottom-width: 1px;
  padding: 15px 0;
  cursor: pointer;
  width: 100%;

  &:hover {
    opacity: 0.9;
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
};

type State = {
  isOpen: boolean,
};

export class DropdownComponent extends Component<Props, State> {
  state = {
    isOpen: false,
  };

  render() {
    return (
      <PopoverWithStyle
        isOpen={this.state.isOpen}
        preferPlace='below'
        body={[
          <ClickOutside onClickOutside={() => this.setState(() => ({ isOpen: false }))}>
            <MenuWrapper>
              <TextComponent value='All Addresses' isBold />
              {this.props.options.map(({ label, onClick }) => (
                <MenuItem onClick={onClick}>
                  <TextComponent value={label} />
                </MenuItem>
              ))}
            </MenuWrapper>
          </ClickOutside>,
        ]}
        tipSize={10}
      >
        {this.props.renderTrigger(() => this.setState(state => ({ isOpen: !state.isOpen })), this.state.isOpen)}
      </PopoverWithStyle>
    );
  }
}
