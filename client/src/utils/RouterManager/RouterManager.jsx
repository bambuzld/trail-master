import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {useAuth} from 'utils/Hooks'

//Routes
import Dashboard from '../../screens/Dashboard';
import ProfilePage from 'screens/ProfilePage';

//initial redirect
const renderRedirect = () => <Redirect to="/dashboard" exact />;

const RouterManager = () => {
  const [user,isAuth] = useAuth()
  console.log('user,auth', user,isAuth);

  return (
      <Switch>
      <Route Route key={0} path="/dashboard" exact component={Dashboard} />
      <Route Route key={0} path="/profile" exact component={ProfilePage} />
      {/* {renderRedirect()} */}
    </Switch>
  );
};

export default RouterManager;
