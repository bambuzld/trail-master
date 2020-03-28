import { useState, useEffect } from 'react';
import {get} from 'utils/localStorage'

import {useMainContext} from 'containers/mainContext'

export const useAuth = () => {
  const [tokenId, setTokenId] = useState(null);
  const {user: {isAuth, currentUser}, dispatch}  = useMainContext()
  

  useEffect(() => {
    const token = get('Bearer')
    if(token){
        setTokenId(token)
        dispatch({type: "IS_LOGGED_IN",payload: true })
    }
    const currentUser = get('currentUser')
    if(currentUser){
        dispatch({type: "LOGIN_USER",payload: currentUser })
    }
   
  }, []);



  return [isAuth,currentUser]
};
