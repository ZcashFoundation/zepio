import { combineReducers } from 'redux';
import todoReducer from './todo';

const rootReducer = combineReducers({
  todos: todoReducer,
});

export default rootReducer;
