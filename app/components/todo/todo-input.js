// @flow

import React, { Component } from 'react';

type Props = {
  addTodo: Function,
};

type State = {
  value: string,
};

export default class TodoInput extends Component<Props, State> {
  state = {
    value: '',
  };

  handleSubmit = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = this.state;
    const { addTodo } = this.props;
    const trimValue = value.trim();

    event.preventDefault();

    if (trimValue !== '') {
      addTodo(trimValue);
      this.setState({ value: '' });
    }
  }

  handleInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { target: { value } } = event;
    this.setState({ value });
  }

  render() {
    const { value } = this.state;

    return (
      <form
        className='todo__input'
        onSubmit={this.handleSubmit}
      >
        <input
          value={value}
          onChange={this.handleInputChange}
          className='todo__input-field'
        />
        <button
          type='submit'
          className='todo__input-button'
        >
          Submit
        </button>
      </form>
    );
  }
}
