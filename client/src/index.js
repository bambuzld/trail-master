import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import "./assets/scss/font/Poppins/Poppins-Regular.ttf";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import RouterManager from "./utils/RouterManager";

import Context from "containers/mainContext";
import reducer from "containers/User/User.reducer";

const Root = () => {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Router>
      <Context.Provider value={{ state, dispatch }}>
        <RouterManager />
      </Context.Provider>
    </Router>
  );
};
ReactDOM.render(<Root/>,document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
