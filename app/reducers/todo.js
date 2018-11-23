// @flow

import {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  CANCEL_UPDATE_TODO,
  TOGGLE_EDIT_TODO,
} from '../constants/actions';
import type { TodoType } from '../types/todo';
import type { Action } from '../types/redux';

const initialState = [];

export default (state: Array<TodoType> = initialState, action: Action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        action.payload,
      ];
    case DELETE_TODO:
      // $FlowFixMe
      return state.filter((todo: Object) => todo.id !== action.payload.id);
    case TOGGLE_EDIT_TODO: {
      const { id } = action.payload;
      const todos = [...state];
      const index = todos.map(todo => todo.id).indexOf(id);
      todos[index].editing = true;

      return todos;
    }
    case UPDATE_TODO: {
      const { id, text } = action.payload;
      const todos = [...state];
      const index = todos.map(todo => todo.id).indexOf(id);
      todos[index].text = text;
      todos[index].editing = false;

      return todos;
    }
    case CANCEL_UPDATE_TODO: {
      const { id } = action.payload;
      const todos = [...state];
      const index = todos.map(todo => todo.id).indexOf(id);
      todos[index].editing = false;

      return todos;
    }
    default:
      return state;
  }
};
