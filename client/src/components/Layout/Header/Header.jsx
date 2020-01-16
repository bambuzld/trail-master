import React,{useContext} from "react";
import "./Header.scss";
import logo from "assets/images/logo.svg";

import { GoogleLogin } from "react-google-login";
import { GraphQLClient } from "graphql-request";

import Context from "containers/mainContext";
import { ME_QUERY } from "graphql/queries";


const Header = () => {
  const { dispatch } = useContext(Context);
  //TODO: onsuccess method. onfailure method, figure out context and reducer design
  const onSuccess = async googleUser => {
    try {
        const idToken = googleUser.getAuthResponse().id_token
        const client = new GraphQLClient("http://localhost:4000/graphql",{headers: {authorization: idToken}})
        const me = await client.request(ME_QUERY)
        dispatch({ type: "LOGIN_USER", payload: me });
        dispatch({ type: "IS_LOGGED_IN", payload: googleUser.isSignedIn() });
  
    } catch (error) {
      console.error(error)
    }
  };
  return (
    <nav className="header">
      <div className="header__logo">
        <img src={logo} alt="trail master" title="trail master" />
      </div>
      <div className="header__title">TRAIL MASTER</div>
      <div className="header__right-container">
        <ul>
          <li>Profile</li>
          <li>All Trails</li>
        </ul>
        <GoogleLogin
          clientId="325129789199-aeblq0vopuh6dc62sen30c3q6mqli0kq.apps.googleusercontent.com"
          buttonText="Sign in"
          onSuccess={onSuccess}
          onFailure={() => console.log("btj nece")}
          render={props => (
            <button className="header__sign-in-button" onClick={props.onClick}>
              <span className="header__sign-in">Sign in</span>
            </button>
          )}
        />
      </div>
    </nav>
  );
};

export default Header;
