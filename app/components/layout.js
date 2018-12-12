// @flow

import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
  padding-left: 35px;
  padding-right: 45px;
`;

type Props = {
  chidren: any, // eslint-disable-line
};

export const LayoutComponent = (props: Props) => {
  // $FlowFixMe
  const { children } = props; // eslint-disable-line

  return <Layout>{children}</Layout>;
};
