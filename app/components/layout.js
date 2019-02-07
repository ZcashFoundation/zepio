// @flow

import React, { type Element } from 'react';
import styled from 'styled-components';

import { ErrorModalComponent } from './error-modal';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props: PropsWithTheme<>) => `calc(100% - ${props.theme.sidebarWidth})`};
  height: ${(props: PropsWithTheme<>) => `calc(100vh - ${props.theme.headerHeight})`};
  background-color: ${(props: PropsWithTheme<>) => props.theme.colors.background};
  padding-left: ${(props: PropsWithTheme<>) => props.theme.layoutPaddingLeft};
  padding-right: ${(props: PropsWithTheme<>) => props.theme.layoutPaddingRight};
  overflow: auto;
`;

type Props = {
  children: Element<*>,
  closeErrorModal: () => void,
  isErrorModalVisible: boolean,
  error: string,
};

export const LayoutComponent = (props: Props) => {
  const {
    children, error, isErrorModalVisible, closeErrorModal,
  } = props;

  return (
    <Layout id='layout'>
      {children}
      <ErrorModalComponent
        message={error}
        isVisible={isErrorModalVisible}
        onRequestClose={closeErrorModal}
      />
    </Layout>
  );
};
