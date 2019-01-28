// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Transition, animated } from 'react-spring';

import { ColumnComponent } from './column';
import { Button } from './button';
import { QRCode } from './qrcode';

import truncateAddress from '../utils/truncate-address';

import eyeIcon from '../assets/images/eye.png';

const AddressWrapper = styled.div`
  align-items: center;
  display: flex;
  background-color: #000;
  border-radius: 6px;
  padding: 7px 13px;
  width: 100%;
`;

const Input = styled.input`
  border-radius: ${props => props.theme.boxBorderRadius};
  border: none;
  background-color: ${props => props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.text};
  padding: 15px;
  width: 100%;
  outline: none;
  font-family: ${props => props.theme.fontFamily};

  ::placeholder {
    opacity: 0.5;
  }
`;

/* eslint-disable max-len */
const Btn = styled(Button)`
  border-width: 1px;
  font-weight: ${props => props.theme.fontWeight.regular};
  border-color: ${props => (props.isVisible ? props.theme.colors.primary : props.theme.colors.buttonBorderColor)};
  padding: 8px 10px;
  min-width: 260px;

  img {
    height: 12px;
    width: 20px;
  }
`;
/* eslint-enable max-len */

const QRCodeWrapper = styled.div`
  align-items: center;
  display: flex;
  background-color: #000;
  border-radius: 6px;
  padding: 20px;
  margin-top: 10px;
  width: 100%;
`;

const RevealsMain = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: ${props => (props.isVisible ? '178px' : 0)}
  transition: all 0.25s ease-in-out;

  & > div {
    top: 0;
    right: 0;
    left: 0;
  }
`;

type Props = {
  address: string,
  isVisible?: boolean,
};

type State = {
  isVisible: boolean,
};

export class WalletAddress extends PureComponent<Props, State> {
  static defaultProps = {
    isVisible: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = { isVisible: Boolean(props.isVisible) };
  }

  show = () => this.setState(() => ({ isVisible: true }));

  hide = () => this.setState(() => ({ isVisible: false }));

  render() {
    const { address } = this.props;
    const { isVisible } = this.state;
    const toggleVisibility = isVisible ? this.hide : this.show;
    const buttonLabel = `${isVisible ? 'Hide' : 'Show'} details and QR Code`;

    return (
      <ColumnComponent width='100%'>
        <AddressWrapper>
          <Input
            value={isVisible ? address : truncateAddress(address)}
            onChange={() => {}}
            onFocus={event => event.currentTarget.select()}
          />
          <Btn
            icon={eyeIcon}
            label={buttonLabel}
            onClick={toggleVisibility}
            variant='secondary'
            isVisible={isVisible}
          />
        </AddressWrapper>
        <RevealsMain isVisible={isVisible}>
          <Transition
            native
            items={isVisible}
            enter={[
              {
                height: 'auto',
                opacity: 1,
              },
            ]}
            leave={{ height: 0, opacity: 0 }}
            from={{
              position: 'absolute',
              overflow: 'hidden',
              opacity: 0,
              height: 0,
            }}
          >
            {show => show
              && (props => (
                <animated.div style={props}>
                  <QRCodeWrapper>
                    <QRCode value={address} />
                  </QRCodeWrapper>
                </animated.div>
              ))
            }
          </Transition>
        </RevealsMain>
      </ColumnComponent>
    );
  }
}
