// @flow
import React from 'react';
import styled from 'styled-components';

import { InputLabelComponent } from '../components/input-label';
import { RowComponent } from '../components/row';
import { WalletAddress } from '../components/wallet-address';

type Props = {
  addresses: Array<string>,
};

const Wrapper = styled.div`
  margin-top: ${props => props.theme.layoutContentPaddingTop};
`;

const Row = styled(RowComponent)`
  margin-bottom: 10px;
`;

const Label = styled(InputLabelComponent)`
  margin: 0;
  margin-bottom: 10px;
`;

export const ReceiveView = ({ addresses }: Props) => (
  <Wrapper>
    <Label value='Addresses: ' />
    {(addresses || []).map(address => (
      <Row
        key={address}
        alignItems='center'
        justifyContent='space-between'
      >
        <WalletAddress address={address} />
      </Row>
    ))}
  </Wrapper>
);
