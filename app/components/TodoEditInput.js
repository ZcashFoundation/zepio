// @flow

import React, { Component } from 'react';
import type { TodoType } from '../types/todo';

type Props = {
  updateTodo: Function,
  todo: TodoType,
  cancelUpdateTodo: Function,
};

type State = {
  value: string,
};

export default class TodoEditInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.todo.text || '',
    };
  }

  handleSubmit = (event: SyntheticInputEvent<HTMLInputElement>, id: string) => {
    const { value } = this.state;
    const { updateTodo } = this.props;
    const trimValue = value.trim();

    event.preventDefault();

    if (trimValue !== '') {
      updateTodo(id, trimValue);
      this.setState({ value: '' });
    }
  };

  handleCancel = (id: string) => {
    const { cancelUpdateTodo } = this.props;
    cancelUpdateTodo(id);
  };

  handleInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { todo } = this.props;

    return (
      <div className='todo-item__view todo-item__view--edit'>
        <form className='todo-item__input' onSubmit={e => this.handleSubmit(e, todo.id)}>
          <input value={value} onChange={this.handleInputChange} className='todo-item__input-field' autoFocus />
          <button type='submit' className='todo-item__input-button'>
            Update
          </button>
        </form>
        <button type='button' className='todo-item__input-cancel' onClick={() => this.handleCancel(todo.id)}>
          Cancel
        </button>
      </div>
    );
  }
}
