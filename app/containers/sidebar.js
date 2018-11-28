// @flow

import { connect } from 'react-redux';
import { SidebarComponent } from '../components/Sidebar';

const mapStateToProps = (state: Object) => ({
  todos: state.todos,
});

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   addTodo: text => dispatch(addTodo(text)),
// });

export const SidebarContainer = connect(
  mapStateToProps,
  // mapDispatchToProps,
)(SidebarComponent);
