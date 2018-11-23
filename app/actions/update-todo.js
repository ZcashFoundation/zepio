// @flow

import { UPDATE_TODO } from '../constants/actions';

export const updateTodo = (id: string, text: string) => ({
  type: UPDATE_TODO,
  payload: {
    text,
    id,
  },
});
