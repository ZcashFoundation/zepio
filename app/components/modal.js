// @flow
import React, { PureComponent, Fragment, type Element } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ChildrenWrapper = styled.div`
  z-index: 90;
`;

type Props = {
  renderTrigger: (() => void) => Element<*>,
  children: Element<*>,
};

type State = {
  isVisible: boolean,
};

const modalRoot = document.getElementById('modal-root');

export class ModalComponent extends PureComponent<Props, State> {
  element = document.createElement('div');

  state = {
    isVisible: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscPress);
  }

  handleEscPress = (event: Object) => {
    const { isVisible } = this.state;

    if (event.key === 'Escape' && isVisible) {
      this.close();
    }
  };

  open = () => {
    this.setState(
      () => ({ isVisible: true }),
      () => {
        if (modalRoot) modalRoot.appendChild(this.element);
      },
    );
  };

  close = () => {
    this.setState(
      () => ({ isVisible: false }),
      () => {
        if (modalRoot) modalRoot.removeChild(this.element);
      },
    );
  };

  render() {
    const { renderTrigger, children } = this.props;
    const { isVisible } = this.state;

    return (
      <Fragment>
        {renderTrigger(isVisible ? this.close : this.open)}
        {isVisible
          ? createPortal(
            <ModalWrapper
              id='modal-portal-wrapper'
              onClick={(event) => {
                if (event.target.id === 'modal-portal-wrapper') this.close();
              }}
            >
              <ChildrenWrapper>{children}</ChildrenWrapper>
            </ModalWrapper>,
            this.element,
          )
          : null}
      </Fragment>
    );
  }
}
