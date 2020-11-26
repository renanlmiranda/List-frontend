import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from '../pages/register';
import Home from '../pages/home';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/register" component={Register} />
  </Switch>
);

export default Routes;
