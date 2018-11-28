// @flow

import React, { PureComponent } from 'react';
import TodoEditInput from './TodoEditInput';
import TodoListItem from './TodoListItem';
import type { TodoType } from '../types/todo';

type Props = {
  todos: Array<TodoType>,
  deleteTodo: Function,
  toggleEdit: Function,
  updateTodo: Function,
  cancelUpdateTodo: Function,
};

export default class TodoList extends PureComponent<Props> {
  renderTodoView = (todo: TodoType) => {
    const { deleteTodo, toggleEdit } = this.props;

    return <TodoListItem todo={todo} deleteTodo={deleteTodo} toggleEdit={toggleEdit} />;
  };

  renderEditView = (todo: TodoType) => {
    const { updateTodo, cancelUpdateTodo } = this.props;

    return <TodoEditInput todo={todo} updateTodo={updateTodo} cancelUpdateTodo={cancelUpdateTodo} />;
  };

  renderList = () => {
    const { todos } = this.props;
    const sortTodosByTime = todos.sort((a, b) => b.createdAt - a.createdAt);

    return (
      <ul className='todo__list'>
        {sortTodosByTime.map(todo => (
          <li key={todo.id} className='todo__list-item todo-item'>
            {todo.editing ? this.renderEditView(todo) : this.renderTodoView(todo)}
          </li>
        ))}
      </ul>
    );
  };

  renderEmptyState = () => <p className='todo__list todo__list--empty'>No todos right now</p>;

  render() {
    const { todos } = this.props;
    const hasTodos = todos.length;

    return hasTodos ? this.renderList() : this.renderEmptyState();
  }
}
