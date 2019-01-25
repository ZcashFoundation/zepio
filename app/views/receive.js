// @flow
import React, { Fragment, PureComponent } from 'react';
import styled from 'styled-components';
import { Transition, animated } from 'react-spring';

import { InputLabelComponent } from '../components/input-label';
import { RowComponent } from '../components/row';
import { TextComponent } from '../components/text';
import { WalletAddress } from '../components/wallet-address';

import MenuIcon from '../assets/images/menu_icon.svg';

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

const ShowMoreButton = styled.button`
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

const ShowMoreIcon = styled.img`
  width: 25px;
  height: 25px;
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 100%;
  margin-right: 11.5px;
`;

const RevealsMain = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  & > div {
    top: 0;
    right: 0;
    left: 0;
  }
`;

type Props = {
  addresses: Array<string>,
  loadAddresses: () => void,
};

type State = {
  showAdditionalOptions: boolean,
}

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

  renderShieldedAddresses = (address: string) => {
    const { showAdditionalOptions } = this.state;
    const buttonText = `${showAdditionalOptions ? 'Hide' : 'Show'} Other Address Types`;

    return (
      <Fragment>
        <Label value='Shielded Address' />
        <Row
          alignItems='center'
          justifyContent='space-between'
        >
          <WalletAddress address={address} />
        </Row>
        <Row>
          <ShowMoreButton
            onClick={this.toggleAdditionalOptions}
            isActive={showAdditionalOptions}
          >
            <ShowMoreIcon
              isActive={showAdditionalOptions}
              src={MenuIcon}
              alt='More Options'
            />
            <TextComponent value={buttonText} />
          </ShowMoreButton>
        </Row>
      </Fragment>
    );
  }

  renderTransparentAddresses = (address: string) => {
    const { showAdditionalOptions } = this.state;

    return (
      <RevealsMain>
        <Transition
          native
          items={showAdditionalOptions}
          enter={[{ height: 'auto', opacity: 1 }]}
          leave={{ height: 0, opacity: 0 }}
          from={{
            position: 'absolute',
            overflow: 'hidden',
            height: 0,
            opacity: 0,
          }}
        >
          {show => show && (props => (
            <animated.div style={props}>
              <Label value='Transparent Address (not private)' />
              <Row
                key={address}
                alignItems='center'
                justifyContent='space-between'
              >
                <WalletAddress address={address} />
              </Row>
            </animated.div>
          ))}
        </Transition>
      </RevealsMain>
    );
  }

  render() {
    const { addresses } = this.props;

    return (
      <div>
        {(addresses || []).map((address, index) => {
          if (index === 0) return this.renderShieldedAddresses(address);
          return this.renderTransparentAddresses(address);
        })}
      </div>
    );
  }
}
