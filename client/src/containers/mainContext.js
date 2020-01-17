import React,{ createContext, useReducer } from "react";

import userContext from 'containers/User/User.context'
import UserReducer, {key as userKey} from 'containers/User/User.reducer'
import combineReducer from 'utils/combineReducer'





export const MainContext = createContext()

const MainProvider = ({children}) => {
  const initialValue = {
    [userKey]:userContext
  }
  const rootReducer = combineReducer({
    [userKey]: UserReducer
  })
  const [state,dispatch] = useReducer(rootReducer,initialValue)

  const initialState = {
    dispatch,
    [userKey]:{
      ...state[userKey]
    }
  }

  return (
    <MainContext.Provider value={initialState}>
      {children}
    </MainContext.Provider>
  )
}




export default MainProvider;
