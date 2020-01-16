import { createContext } from "react";

import userContext from 'containers/User/User.context'
console.log('userContext', userContext);


const Context = createContext({
  ...userContext
});

export default Context;
