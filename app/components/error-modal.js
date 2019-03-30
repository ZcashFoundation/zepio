// @flow

import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { TextComponent } from './text';
import { Button } from './button';

import ErrorIcon from '../assets/images/error_icon_dark.png';

const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ChildrenWrapper = styled.div`
  width: 350px;
  background-color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.boxBorderRadius};
  box-shadow: 0px 0px 30px 0px black;
  position: relative;
  z-index: 90;
  min-height: 400px;
`;

const Message = styled(TextComponent)`
  margin: 35px 0;
`;

const ErrorImage = styled.img`
  width: 35px;
  height: 35px;
  margin-bottom: 15px;
`;

type Props = {
  isVisible: boolean,
  message: string,
  onRequestClose: () => void,
};

const modalRoot = document.getElementById('modal-root');

export class ErrorModalComponent extends PureComponent<Props> {
  element = document.createElement('div');

  componentDidMount() {
    const { isVisible } = this.props;

    if (isVisible) {
      if (modalRoot) modalRoot.appendChild(this.element);
    }
  }

  componentDidUpdate = (prevProps: Props) => {
    const { isVisible } = this.props;

    if (!prevProps.isVisible && isVisible) {
      if (modalRoot) modalRoot.appendChild(this.element);
    }

    if (prevProps.isVisible && !isVisible) {
      if (modalRoot) modalRoot.removeChild(this.element);
    }
  };

  render() {
    const { isVisible, message, onRequestClose } = this.props;

    return !isVisible
      ? null
      : createPortal(
        <ModalWrapper id='error-modal-portal-wrapper'>
          <ChildrenWrapper>
            <ErrorImage src={ErrorIcon} alt='Error Icon' />
            <Message value={message} />
            <Button label='Ok' onClick={onRequestClose} />
          </ChildrenWrapper>
        </ModalWrapper>,
        this.element,
      );
  }
}
