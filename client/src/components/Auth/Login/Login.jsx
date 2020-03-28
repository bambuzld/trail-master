import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { GraphQLClient } from 'graphql-request';

import { ME_QUERY } from 'graphql/queries';
import { useMainContext } from 'containers/mainContext';

import { BASE_URL } from 'utils/Hooks/useClient';
import { useNotification } from 'utils/useNotifications';
import { set} from 'utils/localStorage';

import CustomButton from 'components/Button';
import { Button } from '@chakra-ui/core';







const Login = ({ inPopup }) => {
  const { dispatch } = useMainContext();
  const [addNotification] = useNotification();

  const onSuccess = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: idToken }
      });
      const me = await client.request(ME_QUERY);
      dispatch({ type: 'LOGIN_USER', payload: me.me });
      dispatch({ type: 'IS_LOGGED_IN', payload: googleUser.isSignedIn() });
      set('Bearer', idToken);
      set('currentUser', me.me);
    } catch (error) {
      addNotification({
        status: 'error',
        text: `Login error, unable to log in. Please try again.`,
        duration: 3000
      });
    }
  };

  const renderComponent = props => {
    if (!inPopup) {
      return <CustomButton label="Sign in" onClick={props.onClick} />;
    }
    return (
      <Button
        mt={4}
        color="brandOrange"
        onClick={props.onClick}
      >
        Sign in
      </Button>
    );
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
      buttonText="Sign in"
      onSuccess={onSuccess}
      onFailure={error =>
        addNotification({
          status: 'error',
          text: `Login error, unable to log in. Please try again.`,
          duration: 3000
        })
      }
      render={props => renderComponent(props)}
    />
  );
};

export default Login;
