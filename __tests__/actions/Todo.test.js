// @flow

import configureStore from 'redux-mock-store';

import { ADD_TODO, addTodo } from '../../app/redux/modules/todo';

const store = configureStore()();

describe('Todo Actions', () => {
  beforeEach(() => store.clearActions());

  test('should create an action to add a new todo', () => {
    const text = 'Hello World!';

    store.dispatch(addTodo(text));

    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        type: ADD_TODO,
        payload: {
          text,
          id: expect.any(String),
          editing: false,
          createdAt: expect.any(Number),
        },
      }),
    );
  });
});
