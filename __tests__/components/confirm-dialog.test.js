// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { ConfirmDialogComponent } from '../../app/components/confirm-dialog';

afterEach(cleanup);

describe('<ConfirmDialogComponent />', () => {
  test('should render confirm dialog correctly', () => {
    const { container } = render(
      <ConfirmDialogComponent
        title='Confirm example'
        onConfirm={() => alert('Confirm')} // eslint-disable-line
        renderTrigger={toggle => (
          <button
            onClick={toggle}
            type='button'
          >
            Open!
          </button>
        )}
      >
        {(/* toggle */) => <div>Confirm content</div>}
      </ConfirmDialogComponent>,
    );

    expect(container).toBeVisible();
  });

  test('should render confirm dialog trigger', () => {
    const { queryByTestId } = render(
      <ConfirmDialogComponent
        title='Confirm example'
        onConfirm={() => alert('Confirm')} // eslint-disable-line
        renderTrigger={toggle => (
          <button
            data-testid='ConfirmDialogTrigger'
            onClick={toggle}
            type='button'
          >
            Open!
          </button>
        )}
      >
        {(/* toggle */) => <div>Confirm content</div>}
      </ConfirmDialogComponent>,
    );

    expect(queryByTestId('ConfirmDialogTrigger')).toBeInTheDocument();
  });
});
