const combineReducer = reducers => {
    const reducerKeys = Object.keys(reducers);
  
    return function combination(state = {}, {type,payload}) {
      let nextState = state;
  
      for (let i = 0; i < reducerKeys.length; i++) {
        const key = reducerKeys[i];
        const reducer = reducers[key];
        const previousStateForKey = state[key];
        const nextStateForKey = reducer(previousStateForKey, {type,payload});
  
        nextState = { ...nextState, [key]: nextStateForKey };
      }
      return nextState;
    };
  };
  
  export default combineReducer;
  
