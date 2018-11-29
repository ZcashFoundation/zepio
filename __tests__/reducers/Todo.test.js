// @flow

import todoReducer, { ADD_TODO } from '../../app/redux/modules/todo';

describe('Todo Reducer', () => {
  test('should return the valid initial state', () => {
    const initialState = [];
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: {},
    };

    expect(todoReducer(undefined, action)).toEqual(initialState);
  });

  test('should add a new todo', () => {
    const action = {
      type: ADD_TODO,
      payload: {
        id: 'abc123',
        text: 'Hello World!',
        editing: false,
        createdAt: new Date().getTime(),
      },
    };
    const expectedState = [action.payload];

    expect(todoReducer(undefined, action)).toEqual(expectedState);
  });
});
