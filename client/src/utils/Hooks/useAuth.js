import { useState, useEffect,useContext } from 'react';
import {get} from 'utils/localStorage'

import {MainContext} from 'containers/mainContext'

export const useAuth = () => {
  const [tokenId, setTokenId] = useState(null);
  const {user: {isAuth, currentUser}, dispatch}  = useContext(MainContext)
  

  useEffect(() => {
    const token = get('Bearer')
    if(token){
        setTokenId(token)
        dispatch({type: "IS_LOGGED_IN",payload: true })
    }
    const currentUser = get('currentUser')
    console.log('currentUser', currentUser);
    if(currentUser){
        dispatch({type: "LOGIN_USER",payload: currentUser })
    }
   
  }, []);



  return [isAuth,currentUser]
};
