// @flow

import { TOGGLE_EDIT_TODO } from '../constants/actions';

export const toggleEdit = (id: string) => ({
  type: TOGGLE_EDIT_TODO,
  payload: { id },
});
