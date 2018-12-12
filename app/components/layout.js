// @flow
import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => `calc(100% - ${props.theme.sidebarWidth})`};
  height: ${props => `calc(100vh - ${props.theme.headerHeight})`};
  background-color: ${props => props.theme.colors.background};
  padding-left: ${props => props.theme.layoutPaddingLeft};
  padding-right: ${props => props.theme.layoutPaddingRight};
`;

type Props = {
  chidren: any, // eslint-disable-line
};

export const LayoutComponent = (props: Props) => {
  // $FlowFixMe
  const { children } = props; // eslint-disable-line

  return <Layout>{children}</Layout>;
};
