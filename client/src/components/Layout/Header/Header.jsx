import React,{useContext} from "react";
import "./Header.scss";
import logo from "assets/images/logo.svg";
import Button  from 'components/Button'

import { GoogleLogin } from "react-google-login";
import { GraphQLClient } from "graphql-request";

import {MainContext} from "containers/mainContext";
import { ME_QUERY } from "graphql/queries";

import {set} from 'utils/localStorage'
import LocationAutocomplete from 'components/LocationAutocomplete';



const Header = ({hasTitle, hasAutocomplete}) => {
  console.log('hasAutocomplete', hasAutocomplete);
  const { dispatch } = useContext(MainContext);
  //TODO: onsuccess method. onfailure method, figure out context and reducer design
  const onSuccess = async googleUser => {
    console.log('click')
    try {
        const idToken = googleUser.getAuthResponse().id_token
        const client = new GraphQLClient("http://localhost:4000/graphql",{headers: {authorization: idToken}})
        const me = await client.request(ME_QUERY)
        dispatch({ type: "LOGIN_USER", payload: me });
        dispatch({ type: "IS_LOGGED_IN", payload: googleUser.isSignedIn() });
        set('currentUser',me)

  
    } catch (error) {
      console.error(error)
    }
  };
  if(hasAutocomplete){
    return (
      <nav className="header centered" >
        <LocationAutocomplete/>
      </nav>

    )
  }
  return (
    <nav className="header">
      <div className="header__logo">
        <img src={logo} alt="trail master" title="trail master" />
      </div>
      {hasTitle ? <div className="header__title">TRAIL MASTER</div> : <div className="header__title-mock"/>}
      <div className="header__right-container">
        <ul>
          <li>Profile</li>
          <li>All Trails</li>
        </ul>
        <GoogleLogin
          clientId="325129789199-aeblq0vopuh6dc62sen30c3q6mqli0kq.apps.googleusercontent.com"
          buttonText="Sign in"
          onSuccess={onSuccess}
          onFailure={(error) => console.error(error)}
          render={props => (
           <Button label="Sign in" onClick={props.onClick}/>
          )}
        />
      </div>
    </nav>
  );
};

export default Header;
