// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { ModalComponent } from '../../app/components/modal';

afterEach(cleanup);

describe('<ModalComponent />', () => {
  test('should render modal trigger correctly', () => {
    const { queryByTestId } = render(
      <ModalComponent
        renderTrigger={toggleVisibility => (
          <button
            type='button'
            data-testid='ModalTrigger'
            onClick={toggleVisibility}
          >
            Open Modal
          </button>
        )}
      >
        {toggleVisibility => (
          <div style={{ padding: '50px', backgroundColor: 'white' }}>
            Modal Content
            <button
              type='button'
              onClick={toggleVisibility}
            >
              Close Modal
            </button>
          </div>
        )}
      </ModalComponent>,
    );

    expect(queryByTestId('ModalTrigger')).toBeInTheDocument();
  });
});
