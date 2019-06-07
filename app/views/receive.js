// @flow

import React, { PureComponent } from 'react';
import styled, { withTheme } from 'styled-components';
import { Transition, animated } from 'react-spring';

import { DARK } from '../constants/themes';
import { FETCH_STATE } from '../constants/fetch-states';

import { InputLabelComponent } from '../components/input-label';
import { RowComponent } from '../components/row';
import { TextComponent } from '../components/text';
import { WalletAddress } from '../components/wallet-address';
import { LoaderComponent } from '../components/loader';

import MenuIconDark from '../assets/images/menu_icon_dark.svg';
import MenuIconLight from '../assets/images/menu_icon_light.svg';
import PlusIconDark from '../assets/images/plus_icon_dark.svg';
import PlusIconLight from '../assets/images/plus_icon_light.svg';
import ShieldGrayImage from '../assets/images/shield_dark_gray.png';

import type { addressType } from '../redux/modules/receive';
import type { MapStateToProps, MapDispatchToProps } from '../containers/receive';

const TRANSPARENT_ADDRESS_SUBLABEL = 'Using a transparent address makes your transaction details public.';

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

const SubLabel = styled(InputLabelComponent)`
  color: ${props => props.theme.colors.transactionsDate};
  font-size: ${props => `${props.theme.fontSize.regular * 0.9}em`};
  font-weight: ${props => String(props.theme.fontWeight.light)};
  letter-spacing: 0.5px;
  margin-bottom: 10px;
  margin-top: 0;
  padding-top: 8px;
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

const ShieldedLabel = styled(Label)`
  padding-left: 14px;
  position: relative;

  &:before {
    position: absolute;
    left: 0;
    top: -1px;
    content: '';
    background: url(${ShieldGrayImage});
    background-size: cover;
    height: 12px;
    width: 11px;
  }
`;

type Props = MapDispatchToProps &
  MapStateToProps & {
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
    const { addresses, theme, fetchState } = this.props;
    const { showAdditionalOptions } = this.state;
    const buttonText = `${showAdditionalOptions ? 'Hide' : 'Show'} Other Address Types`;

    if (fetchState === FETCH_STATE.INITIALIZING) {
      return <LoaderComponent />;
    }

    const shieldedAddresses = addresses.filter(({ address }) => address.startsWith('z'));
    const transparentAddresses = addresses.filter(({ address }) => address.startsWith('t'));

    const seeMoreIcon = theme.mode === DARK ? MenuIconDark : MenuIconLight;

    const plusIcon = theme.mode === DARK ? PlusIconDark : PlusIconLight;

    return (
      <div id='receive-wrapper'>
        <ShieldedLabel value='Shielded Address' id='shielded-address-label' />
        {shieldedAddresses.map(({ address, balance }) => (
          <WalletAddress key={address} address={address} balance={balance} />
        ))}
        <Row justifyContent='space-between'>
          <ActionButton
            id='receive-get-new-shielded'
            onClick={() => this.generateNewAddress('shielded')}
          >
            <PlusIcon src={plusIcon} alt='New Shielded Address' />
            <ActionText value='New Shielded Address' />
          </ActionButton>
          <ActionButton
            id='receive-show-other'
            onClick={this.toggleAdditionalOptions}
            isActive={showAdditionalOptions}
          >
            <ActionIcon isActive={showAdditionalOptions} src={seeMoreIcon} alt='More Options' />
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
                  id='receive-transparent-addresses-wrapper'
                  style={{
                    ...props,
                    width: '100%',
                    height: 'auto',
                  }}
                >
                  <Label value='Transparent Address (not private)' />
                  <SubLabel value={TRANSPARENT_ADDRESS_SUBLABEL} />
                  {transparentAddresses.map(({ address, balance }) => (
                    <WalletAddress key={address} address={address} balance={balance} />
                  ))}
                  <ActionButton
                    id='receive-get-net-transparent'
                    onClick={() => this.generateNewAddress('transparent')}
                  >
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
