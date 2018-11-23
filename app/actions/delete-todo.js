// @flow

import { DELETE_TODO } from '../constants/actions';

export const deleteTodo = (id: string) => ({
  type: DELETE_TODO,
  payload: { id },
});
