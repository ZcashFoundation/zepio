// @flow

import React, { type Node } from 'react';
import styled from 'styled-components';

import { TextComponent } from './text';
import { Button } from './button';
import { Divider } from './divider';
import { ModalComponent } from './modal';

import CloseIcon from '../assets/images/close_icon.svg';

const Wrapper = styled.div`
  display: flex;
  width: ${(props: PropsWithTheme<{ width: number }>) => `${String(props.width)}px`};
  background-color: ${props => props.theme.colors.background};
  flex-direction: column;
  align-items: center;
  border-radius: ${props => props.theme.boxBorderRadius};
  box-shadow: ${props => props.theme.colors.transactionDetailsShadow}
  position: relative;
`;

const CloseIconWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: flex-end;
  position: absolute;
`;

const TitleWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CloseIconImg = styled.img`
  width: 16px;
  height: 16px;
  margin-top: 12px;
  margin-right: 12px;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
  padding: 20px 40px 10px;

  & > :first-child {
    margin-right: 5px;
  }

  & > :last-child {
    margin-left: 5px;
  }
`;

const Btn = styled(Button)`
  width: 95%;
  margin-bottom: 10px;
`;

type Props = {
  renderTrigger?: (() => void) => Node,
  title: string,
  onConfirm: (() => void) => void,
  onClose?: () => void,
  showButtons?: boolean,
  showSingleConfirmButton?: boolean,
  singleConfirmButtonText?: string,
  width?: number,
  isLoading?: boolean,
  isVisible?: boolean,
  children: (() => void) => Node,
};

export const ConfirmDialogComponent = ({
  children,
  title,
  onConfirm,
  onClose,
  renderTrigger,
  showButtons,
  showSingleConfirmButton,
  singleConfirmButtonText,
  isLoading,
  isVisible,
  width,
}: Props) => {
  const handleClose = toggle => () => {
    toggle();
    if (onClose) onClose();
  };

  return (
    <ModalComponent
      id='confirm-dialog-modal-wrapper'
      renderTrigger={renderTrigger}
      closeOnBackdropClick={false}
      closeOnEsc={false}
      isVisible={isVisible}
    >
      {toggle => (
        <Wrapper width={Number(width)}>
          <CloseIconWrapper>
            <CloseIconImg src={CloseIcon} onClick={handleClose(toggle)} />
          </CloseIconWrapper>
          <TitleWrapper>
            <TextComponent value={title} align='center' />
          </TitleWrapper>
          <Divider opacity={0.3} />
          {children(handleClose(toggle))}
          {showButtons && !showSingleConfirmButton && (
            <ButtonWrapper>
              <Btn
                id='confirm-modal-button'
                label='Confirm'
                onClick={() => onConfirm(handleClose(toggle))}
                isLoading={isLoading}
              />
              <Btn
                label='Cancel'
                onClick={handleClose(toggle)}
                variant='secondary'
                disabled={isLoading}
              />
            </ButtonWrapper>
          )}
          {showSingleConfirmButton && (
            <ButtonWrapper>
              <Btn
                id='confirm-modal-button'
                label={String(singleConfirmButtonText)}
                onClick={() => onConfirm(handleClose(toggle))}
                isLoading={isLoading}
              />
            </ButtonWrapper>
          )}
        </Wrapper>
      )}
    </ModalComponent>
  );
};

ConfirmDialogComponent.defaultProps = {
  showButtons: true,
  showSingleConfirmButton: false,
  singleConfirmButtonText: 'Ok!',
  width: 460,
  isLoading: false,
  isVisible: false,
  onClose: () => {},
  renderTrigger: () => null,
};
