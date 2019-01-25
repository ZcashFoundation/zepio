// @flow

import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { ModalComponent } from '../../app/components/modal';

afterEach(cleanup);

describe('<ModalComponent />', () => {
  describe('render()', () => {
    test('should render modal correctly', () => {
      const { container } = render(
        <ModalComponent
          renderTrigger={toggleVisibility => (
            <button type="button" onClick={toggleVisibility}>
              Open Modal
            </button>
          )}
        >
          {toggleVisibility => (
            <div style={{ padding: '50px', backgroundColor: 'white' }}>
              Modal Content
              <button type="button" onClick={toggleVisibility}>
                Close Modal
              </button>
            </div>
          )}
        </ModalComponent>,
      );

      expect(container).toMatchSnapshot();
    });
  });
});
