import { useState, useEffect } from 'react';
import { GraphQLClient } from 'graphql-request';
import { set, get } from 'utils/localStorage';
export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://trail-master-api.herokuapp.com'
    : 'http://localhost:4000/graphql';

export const useClient = () => {
  const [idToken, setIdToken] = useState('');

  useEffect(() => {
    if (!get('Bearer')) {
      const token = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().id_token;
      if (token) {
        set('Bearer', token);
        setIdToken(token);
      }
    } else {
      const token = get('Bearer');
      setIdToken(token);
    }
  }, []);

  return new GraphQLClient(BASE_URL, {
    headers: {
      authorization: idToken
    }
  });
};
