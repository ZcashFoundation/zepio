// @flow

import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  position: absolute;
  width: calc(100vh - 200px);
  left: 0;
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
