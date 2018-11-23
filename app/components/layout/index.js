// @flow

import React from 'react';
import styled from 'styled-components';
import { styles } from './styles';

type Props = {
  chidren: any, // eslint-disable-line
};

const Layout = styled.div`${styles.layout}`;

export const LayoutComponent = (props: Props) => {
  // $FlowFixMe
  const { children } = props; // eslint-disable-line

  return (
    <Layout>
      {children}
    </Layout>
  );
};
