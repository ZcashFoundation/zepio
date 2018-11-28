// @flow

import UUID from 'uuid/v4';

import { getTimestamp } from '../../utils/timestamp';

import type { Action } from '../../types/redux';
import type { TodoType } from '../../types/todo';

// Actions
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const TOGGLE_EDIT_TODO = 'TOGGLE_EDIT_TODO';
export const CANCEL_UPDATE_TODO = 'CANCEL_UPDATE_TODO';

// Actions Creators
export const addTodo = (text: string) => ({
  type: ADD_TODO,
  payload: {
    text,
    id: UUID(),
    editing: false,
    createdAt: getTimestamp(),
  },
});

export const cancelUpdateTodo = (id: string) => ({
  type: CANCEL_UPDATE_TODO,
  payload: { id },
});

export const deleteTodo = (id: string) => ({
  type: DELETE_TODO,
  payload: { id },
});

export const toggleEdit = (id: string) => ({
  type: TOGGLE_EDIT_TODO,
  payload: { id },
});

export const updateTodo = (id: string, text: string) => ({
  type: UPDATE_TODO,
  payload: {
    text,
    id,
  },
});

// Initial State
const initialState = [];

// Reducers
export default (state: Array<TodoType> = initialState, action: Action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
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

// SideEffects
