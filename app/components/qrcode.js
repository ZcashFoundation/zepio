// @flow

import React from 'react';
import QR from 'qrcode.react';

type Props = {
  value: string,
  size?: number,
};

export const QRCode = ({ value, size }: Props) => (
  <QR
    data-testid='QRCode'
    value={value}
    size={size}
  />
);

QRCode.defaultProps = {
  size: 128,
};
