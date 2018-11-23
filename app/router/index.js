import React, { Fragment } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import TodoContainer from '../containers/todo';
import AboutView from '../views/about';
import NotFoundView from '../views/not-found';

export default () => (
  <Fragment>
    <div className='header-menu'>
      <Link to='/'>Todo</Link>
      <Link to='/about'>About</Link>
    </div>
    <Switch>
      <Route path='/' exact component={TodoContainer} />
      <Route path='/about' component={AboutView} />
      <Route component={NotFoundView} />
    </Switch>
  </Fragment>
);
