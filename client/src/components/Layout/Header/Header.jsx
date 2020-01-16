import React from "react";
import "./Header.scss";
import logo from "assets/images/logo.svg";
import { GoogleLogin } from "react-google-login";


const Header = () => {
  //TODO: onsuccess method. onfailure method, figure out context and reducer design
  return (
    <nav className="header">
      <div className="header__logo">
        <img src={logo} />
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
          onSuccess={() => console.log("hooray")}
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
