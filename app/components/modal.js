// @flow

import React, { PureComponent, Fragment, type Node } from 'react';
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
  renderTrigger?: (() => void) => Node,
  children: (() => void) => Node,
  closeOnBackdropClick?: boolean,
  closeOnEsc?: boolean,
  isVisible?: boolean,
};

type State = {
  isVisible: boolean,
};

const modalRoot = document.getElementById('modal-root');

export class ModalComponent extends PureComponent<Props, State> {
  element = document.createElement('div');

  static defaultProps = {
    closeOnBackdropClick: true,
    closeOnEsc: true,
    isVisible: false,
    renderTrigger: () => null,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isVisible: props.isVisible || false,
    };
  }

  componentDidMount() {
    const { closeOnEsc } = this.props;
    const { isVisible } = this.state;

    if (isVisible) {
      if (modalRoot) modalRoot.appendChild(this.element);
    }

    if (closeOnEsc) {
      window.addEventListener('keydown', this.handleEscPress);
    }
  }

  componentWillUnmount() {
    const { closeOnEsc } = this.props;

    if (closeOnEsc) {
      window.removeEventListener('keydown', this.handleEscPress);
    }
  }

  handleEscPress = (event: Object) => {
    const { isVisible } = this.state;

    if (event.key === 'Escape' && isVisible) {
      this.close();
    }
  };

  open = () => this.setState(
    () => ({ isVisible: true }),
    () => {
      if (modalRoot) modalRoot.appendChild(this.element);
    },
  );

  close = () => this.setState(
    () => ({ isVisible: false }),
    () => {
      if (modalRoot) modalRoot.removeChild(this.element);
    },
  );

  render() {
    const { renderTrigger, children, closeOnBackdropClick } = this.props;
    const { isVisible } = this.state;
    const toggleVisibility = isVisible ? this.close : this.open;

    const renderTriggerProps = () => (renderTrigger ? renderTrigger(toggleVisibility) : null);

    return (
      <Fragment>
        {renderTriggerProps()}
        {!isVisible
          ? null
          : createPortal(
            <ModalWrapper
              id='modal-portal-wrapper'
              data-testid='Modal'
              onClick={(event) => {
                if (closeOnBackdropClick && event.target.id === 'modal-portal-wrapper') this.close();
              }}
            >
              <ChildrenWrapper>{children(toggleVisibility)}</ChildrenWrapper>
            </ModalWrapper>,
            this.element,
          )}
      </Fragment>
    );
  }
}
