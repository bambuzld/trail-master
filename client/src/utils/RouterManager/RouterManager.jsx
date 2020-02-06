import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//Routes
import Dashboard from '../../screens/Dashboard';
import ProfilePage from 'screens/ProfilePage';

//initial redirect
const renderRedirect = () => <Redirect to="/dashboard" exact />;

const RouterManager = () => {
  return (
      <Switch>
      <Route Route key={0} path="/dashboard" exact component={Dashboard} />
      <Route Route key={0} path="/profile" exact component={ProfilePage} />
      {renderRedirect()}
    </Switch>
  );
};

export default RouterManager;
