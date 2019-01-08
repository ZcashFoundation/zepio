// @flow
import React from 'react';
import styled from 'styled-components';

import { InputLabelComponent } from '../components/input-label';
import { InputComponent } from '../components/input';
import { QRCode } from '../components/qrcode';
import { RowComponent } from '../components/row';
import { ColumnComponent } from '../components/column';

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
    {(addresses || []).map(address => (
      <Row alignItems='center' justifyContent='space-between'>
        <ColumnComponent width='85%'>
          <Label value='Your z-address: ' />
          <InputComponent
            value={address}
            onChange={() => {}}
            onFocus={event => event.currentTarget.select()}
          />
        </ColumnComponent>
        <QRCode value={address} />
      </Row>
    ))}
  </Wrapper>
);
