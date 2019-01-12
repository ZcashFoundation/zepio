// @flow
import React, { type Element } from 'react';
import styled from 'styled-components';

import { TextComponent } from './text';
import { Button } from './button';
import { Divider } from './divider';
import { ModalComponent } from './modal';

import CloseIcon from '../assets/images/close_icon.svg';

const Wrapper = styled.div`
  display: flex;
  width: ${props => `${props.width}px`};
  background-color: ${props => props.theme.colors.background};
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0px 0px 30px 0px black;
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

const Btn = styled(Button)`
  width: 95%;
  margin-bottom: 10px;
`;

type Props = {
  renderTrigger: (() => void) => Element<*>,
  title: string,
  onConfirm: () => void,
  showButtons?: boolean,
  width?: number,
  children: Element<*>,
};

export const ConfirmDialogComponent = ({
  children,
  title,
  onConfirm,
  renderTrigger,
  showButtons,
  width,
}: Props) => (
  <ModalComponent
    renderTrigger={renderTrigger}
    closeOnBackdropClick={false}
    closeOnEsc={false}
  >
    {toggle => (
      <Wrapper width={width}>
        <CloseIconWrapper>
          <CloseIconImg src={CloseIcon} onClick={toggle} />
        </CloseIconWrapper>
        <TitleWrapper>
          <TextComponent value={title} align='center' />
        </TitleWrapper>
        <Divider />
        {React.Children.map(children, _ => _)}
        {showButtons && (
          <>
            <Btn label='Confirm' onClick={onConfirm} />
            <Btn label='Cancel' onClick={toggle} variant='secondary' />
          </>
        )}
      </Wrapper>
    )}
  </ModalComponent>
);

ConfirmDialogComponent.defaultProps = {
  showButtons: true,
  width: 460,
};
