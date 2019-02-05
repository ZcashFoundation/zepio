// @flow

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Transition, animated } from 'react-spring';

import { InputLabelComponent } from '../components/input-label';
import { RowComponent } from '../components/row';
import { TextComponent } from '../components/text';
import { WalletAddress } from '../components/wallet-address';

import MenuIcon from '../assets/images/menu_icon.svg';
import PlusIcon from '../assets/images/plus_icon.svg';

import type { addressType } from '../redux/modules/receive';

const Row = styled(RowComponent)`
  margin-bottom: 10px;
`;

const Label = styled(InputLabelComponent)`
  text-transform: uppercase;
  color: ${props => props.theme.colors.transactionsDate};
  font-size: ${props => `${props.theme.fontSize.regular * 0.9}em`};
  font-weight: ${props => props.theme.fontWeight.bold};
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
  margin-top: 30px;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const ActionIcon = styled.img`
  width: 25px;
  height: 25px;
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 100%;
  margin-right: 11.5px;
  padding: 5px;
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
};

type State = {
  showAdditionalOptions: boolean,
};

export class ReceiveView extends PureComponent<Props, State> {
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
    const { addresses } = this.props;
    const { showAdditionalOptions } = this.state;
    const buttonText = `${showAdditionalOptions ? 'Hide' : 'Show'} Other Address Types`;

    const shieldedAddresses = addresses.filter(addr => addr.startsWith('z'));
    const transparentAddresses = addresses.filter(addr => addr.startsWith('t'));

    return (
      <div>
        <Label value='Shielded Address' />
        {shieldedAddresses.map(addr => (
          <WalletAddress key={addr} address={addr} />
        ))}
        <Row>
          <ActionButton
            onClick={this.toggleAdditionalOptions}
            isActive={showAdditionalOptions}
          >
            <ActionIcon
              isActive={showAdditionalOptions}
              src={MenuIcon}
              alt='More Options'
            />
            <TextComponent value={buttonText} />
          </ActionButton>
          <ActionButton
            onClick={() => this.generateNewAddress('shielded')}
          >
            <ActionIcon
              src={PlusIcon}
              alt='New Shielded Address'
            />
            <TextComponent value='New Shielded Address' />
          </ActionButton>
          <ActionButton
            onClick={() => this.generateNewAddress('transparent')}
          >
            <ActionIcon
              src={PlusIcon}
              alt='New Transparent Address'
            />
            <TextComponent value='New Transparent Address' />
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
            {show => show
              && (props => (
                <animated.div
                  style={{
                    ...props,
                    width: '100%',
                    height: 'auto',
                  }}
                >
                  <Label value='Transparent Address (not private)' />
                  {transparentAddresses.map(addr => (
                    <WalletAddress
                      key={addr}
                      address={addr}
                    />
                  ))}
                </animated.div>
              ))
            }
          </Transition>
        </RevealsMain>
      </div>
    );
  }
}
