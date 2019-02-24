// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { QRCode } from '../../app/components/qrcode';

afterEach(cleanup);

describe('<QRCode />', () => {
  test('should render qrcode component correctly', () => {
    const { queryByTestId } = render(
      <QRCode value='https://znfd.org' />,
    );

    expect(queryByTestId('QRCode')).toBeInTheDocument();
  });
});
