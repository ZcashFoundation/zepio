// @flow

import { CANCEL_UPDATE_TODO } from '../constants/actions';

export const cancelUpdateTodo = (id: string) => ({
  type: CANCEL_UPDATE_TODO,
  payload: { id },
});
