// @flow

import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: calc(100vw - 200px);
  left: 200px;
  top: 0;
  height: 100vh;
  background: #ccc;
`;

type Props = {
  chidren: any, // eslint-disable-line
};

export const LayoutComponent = (props: Props) => {
  // $FlowFixMe
  const { children } = props; // eslint-disable-line

  return <Layout>{children}</Layout>;
};
