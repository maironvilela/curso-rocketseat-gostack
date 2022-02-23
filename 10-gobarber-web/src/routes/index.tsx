import React from 'react';
import { Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SingUp from '../pages/SignUp';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route path="/signup" component={SingUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
