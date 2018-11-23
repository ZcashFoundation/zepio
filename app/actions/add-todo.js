// @flow

import uuidv4 from 'uuid/v4';
import { ADD_TODO } from '../constants/actions';
import { getTimestamp } from '../utils/timestamp';

export const addTodo = (text: string) => ({
  type: ADD_TODO,
  payload: {
    text,
    id: uuidv4(),
    editing: false,
    createdAt: getTimestamp(),
  },
});
