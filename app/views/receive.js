// @flow

import React, { PureComponent } from 'react';
import styled, { withTheme } from 'styled-components';
import { Transition, animated } from 'react-spring';

import { DARK } from '../constants/themes';

import { InputLabelComponent } from '../components/input-label';
import { RowComponent } from '../components/row';
import { TextComponent } from '../components/text';
import { WalletAddress } from '../components/wallet-address';

import MenuIconDark from '../assets/images/menu_icon_dark.svg';
import MenuIconLight from '../assets/images/menu_icon_light.svg';
import PlusIconDark from '../assets/images/plus_icon_dark.svg';
import PlusIconLight from '../assets/images/plus_icon_light.svg';

import type { addressType } from '../redux/modules/receive';

const Row = styled(RowComponent)`
  margin-bottom: 10px;
`;

const Label = styled(InputLabelComponent)`
  text-transform: uppercase;
  color: ${props => props.theme.colors.transactionsDate};
  font-size: ${props => `${props.theme.fontSize.regular * 0.9}em`};
  font-weight: ${props => String(props.theme.fontWeight.bold)};
  margin-bottom: 5px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  color: ${props => props.theme.colors.text};
  outline: none;
  display: flex;
  align-items: center;
  margin: 15px 0;
  opacity: 0.7;
  width: auto;

  &:hover {
    opacity: 1;
  }
`;

const ActionText = styled(TextComponent)`
  white-space: nowrap;
`;

const ActionIcon = styled.img`
  width: 25px;
  height: 25px;
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 100%;
  margin-right: 11.5px;
  padding: 2px;
`;

const PlusIcon = styled(ActionIcon)`
  padding: 6.5px;
`;

const RevealsMain = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

type Props = {
  addresses: Array<string>,
  loadAddresses: () => void,
  getNewAddress: ({ type: addressType }) => void,
  theme: AppTheme,
};

type State = {
  showAdditionalOptions: boolean,
};

class Component extends PureComponent<Props, State> {
  state = {
    showAdditionalOptions: false,
  };

  componentDidMount() {
    const { loadAddresses } = this.props;

    loadAddresses();
  }

  toggleAdditionalOptions = () => this.setState((prevState: State) => ({
    showAdditionalOptions: !prevState.showAdditionalOptions,
  }));

  generateNewAddress = (type: addressType) => {
    const { getNewAddress } = this.props;

    getNewAddress({ type });
  };

  render() {
    const { addresses, theme } = this.props;
    const { showAdditionalOptions } = this.state;
    const buttonText = `${showAdditionalOptions ? 'Hide' : 'Show'} Other Address Types`;

    const shieldedAddresses = addresses.filter(addr => addr.startsWith('z'));
    const transparentAddresses = addresses.filter(addr => addr.startsWith('t'));


    const seeMoreIcon = theme.mode === DARK
      ? MenuIconDark
      : MenuIconLight;

    const plusIcon = theme.mode === DARK
      ? PlusIconDark
      : PlusIconLight;

    return (
      <div>
        <Label value='Shielded Address' />
        {shieldedAddresses.map(addr => (
          <WalletAddress
            key={addr}
            address={addr}
          />
        ))}
        <Row justifyContent='space-between'>
          <ActionButton onClick={() => this.generateNewAddress('shielded')}>
            <PlusIcon
              src={plusIcon}
              alt='New Shielded Address'
            />
            <ActionText value='New Shielded Address' />
          </ActionButton>
          <ActionButton
            onClick={this.toggleAdditionalOptions}
            isActive={showAdditionalOptions}
          >
            <ActionIcon
              isActive={showAdditionalOptions}
              src={seeMoreIcon}
              alt='More Options'
            />
            <ActionText value={buttonText} />
          </ActionButton>
        </Row>
        <RevealsMain>
          <Transition
            native
            items={showAdditionalOptions}
            enter={[{ opacity: 1 }]}
            leave={{ height: 0, opacity: 0 }}
            from={{
              position: 'absolute',
              overflow: 'hidden',
              height: 0,
              opacity: 0,
            }}
          >
            {(show: boolean) => show
              && ((props: Object) => (
                <animated.div
                  style={{
                    ...props,
                    width: '100%',
                    height: 'auto',
                  }}
                >
                  <Label value='Transparent Address (not private)' />
                  {transparentAddresses.map(addr => (
                    <WalletAddress key={addr} address={addr} />
                  ))}
                  <ActionButton onClick={() => this.generateNewAddress('transparent')}>
                    <PlusIcon src={plusIcon} alt='New Transparent Address' />
                    <ActionText value='New Transparent Address' />
                  </ActionButton>
                </animated.div>
              ))
            }
          </Transition>
        </RevealsMain>
      </div>
    );
  }
}

export const ReceiveView = withTheme(Component);
