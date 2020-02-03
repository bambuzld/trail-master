import React,{ createContext, useReducer } from "react";

import userContext from 'containers/User/User.context'
import UserReducer, {key as userKey} from 'containers/User/User.reducer'
import mapContext from 'containers/Map/Map.context'
import MapReducer, {key as mapKey} from 'containers/Map/Map.reducer'
import combineReducer from 'utils/combineReducer'





export const MainContext = createContext()

const MainProvider = ({children}) => {
  const initialValue = {
    [userKey]:userContext,
    [mapKey]:mapContext
  }
  const rootReducer = combineReducer({
    [userKey]: UserReducer,
    [mapKey]: MapReducer
  })
  const [state,dispatch] = useReducer(rootReducer,initialValue)

  const initialState = {
    dispatch,
    [userKey]:{
      ...state[userKey]
    },
    [mapKey]:{
      ...state[mapKey]
    }
  }

  return (
    <MainContext.Provider value={initialState}>
      {children}
    </MainContext.Provider>
  )
}




export default MainProvider;
