// @flow

import React, { PureComponent } from 'react';
import type { TodoType } from '../types/todo';

type Props = {
  todo: TodoType,
  deleteTodo: Function,
  toggleEdit: Function,
};

export default class TodoListItem extends PureComponent<Props> {
  handleDelete = (id: string) => {
    if (!id) return;

    const { deleteTodo } = this.props;
    deleteTodo(id);
  };

  handleEditToggle = (id: string) => {
    if (!id) return;

    const { toggleEdit } = this.props;
    toggleEdit(id);
  };

  render() {
    const { todo } = this.props;

    return (
      <div className='todo-item__view todo-item__view--view'>
        <span className='todo-item__text'>{todo.text}</span>
        <div className='todo-item__buttons'>
          <button type='button' onClick={() => this.handleEditToggle(todo.id)} className='todo-item__button'>
            <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 528.899 528.899'>
              <path
                className='todo-item__svg'
                d='M328.883 89.125l107.59 107.589-272.34 272.34L56.604 361.465l272.279-272.34zm189.23-25.948l-47.981-47.981c-18.543-18.543-48.653-18.543-67.259 0l-45.961 45.961 107.59 107.59 53.611-53.611c14.382-14.383 14.382-37.577 0-51.959zM.3 512.69c-1.958 8.812 5.998 16.708 14.811 14.565l119.891-29.069L27.473 390.597.3 512.69z'
              />
            </svg>
          </button>
          <button type='button' onClick={() => this.handleDelete(todo.id)} className='todo-item__button'>
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 512 512'>
              <path
                className='todo-item__svg'
                fill='#1D1D1B'
                d='M459.232 60.687h-71.955c-1.121-17.642-15.631-31.657-33.553-31.657H161.669c-17.921 0-32.441 14.015-33.553 31.657H64.579c-18.647 0-33.767 15.12-33.767 33.768v8.442c0 18.648 15.12 33.768 33.767 33.768h21.04v342.113c0 13.784 11.179 24.963 24.963 24.963h308.996c13.784 0 24.964-11.179 24.964-24.963V136.665h14.691c18.663 0 33.768-15.12 33.768-33.768v-8.442c-.001-18.648-15.105-33.768-33.769-33.768zM196.674 443.725c0 12.58-10.197 22.803-22.802 22.803-12.598 0-22.803-10.223-22.803-22.803v-284.9c0-12.597 10.205-22.802 22.803-22.802 12.605 0 22.802 10.206 22.802 22.802v284.9zm91.213 0c0 12.58-10.205 22.803-22.803 22.803s-22.803-10.223-22.803-22.803v-284.9c0-12.597 10.205-22.802 22.803-22.802s22.803 10.206 22.803 22.802v284.9zm91.212 0c0 12.58-10.205 22.803-22.803 22.803-12.613 0-22.803-10.223-22.803-22.803v-284.9c0-12.597 10.189-22.802 22.803-22.802 12.598 0 22.803 10.206 22.803 22.802v284.9z'
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}
