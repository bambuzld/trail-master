import React, { useContext, useCallback } from 'react';
import { GoogleLogout } from 'react-google-login';


import { useNotification } from 'utils/useNotifications';
import {MainContext} from 'containers/mainContext'


import { deleteItem } from 'utils/localStorage';

const Logout = ({}) => {
  const [addNotification] = useNotification();
  const {dispatch} = useContext(MainContext)

  const logout = useCallback(() => {

    dispatch({ type: 'LOGIN_USER', payload: null });
    dispatch({ type: 'IS_LOGGED_IN', payload: false });

    deleteItem('Bearer');
    deleteItem('currentUser');
  }, []);

  return (
    <GoogleLogout
      clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
      buttonText="Sign in"
      onLogoutSuccess={logout}
      onFailure={error =>
        addNotification({
          status: 'error',
          text: `Logout error, unable to log out. Please try again.`,
          duration: 3000
        })
      }
      render={ props => <p onClick={props.onClick}>Logout</p>}
    />
  );
};

export default Logout;
