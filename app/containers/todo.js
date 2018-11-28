// @flow

import { connect } from 'react-redux';
import TodoView from '../views/todo';
import {
  addTodo, deleteTodo, toggleEdit, updateTodo, cancelUpdateTodo,
} from '../redux/modules/todo';

import type { AppState } from '../types/app-state';
import type { Dispatch } from '../types/redux';

const mapStateToProps = (state: AppState) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addTodo: text => dispatch(addTodo(text)),
  deleteTodo: id => dispatch(deleteTodo(id)),
  toggleEdit: id => dispatch(toggleEdit(id)),
  updateTodo: (id, text) => dispatch(updateTodo(id, text)),
  cancelUpdateTodo: id => dispatch(cancelUpdateTodo(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoView);
