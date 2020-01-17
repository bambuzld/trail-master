import React,{useContext} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {MainContext} from 'containers/mainContext'

//Routes
import Dashboard from "../../screens/Dashboard";


//initial redirect
const renderRedirect = () => <Redirect to="/dashboard" exact />;

const RouterManager = () => {
  const {isAuth, currentUser} = useContext(MainContext)
  console.log('isAuth', isAuth);
  console.log('currentUser', currentUser);
  return (
    <Switch>
      <Route Route key={0} path="/dashboard" exact component={Dashboard} />
      {renderRedirect()}
    </Switch>
  );
};

export default RouterManager;
