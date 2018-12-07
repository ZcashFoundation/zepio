// @flow

import React from 'react';

import TodoInput from '../components/todo-input';
import TodoList from '../components/todo-list';

import type { TodoType } from '../types/todo';

import checklist from '../assets/images/checklist.svg';

type Props = {
  addTodo: Function,
  deleteTodo: Function,
  toggleEdit: Function,
  todos: Array<TodoType>,
  updateTodo: Function,
  cancelUpdateTodo: Function,
};

export default (props: Props) => {
  const {
    addTodo, todos, deleteTodo, toggleEdit, updateTodo, cancelUpdateTodo,
  } = props;

  return (
    <div className='todo'>
      <div className='todo__heading'>
        <img src={checklist} alt='Testing File Loader' className='todo__image' />
        <h1 className='todo__header'>Todo List App</h1>
      </div>
      <TodoInput addTodo={addTodo} />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleEdit={toggleEdit}
        updateTodo={updateTodo}
        cancelUpdateTodo={cancelUpdateTodo}
      />
    </div>
  );
};
