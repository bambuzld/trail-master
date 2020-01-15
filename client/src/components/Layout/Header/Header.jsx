import React from "react";
import "./Header.scss";
import logo from "assets/images/logo.svg";

const Header = () => {
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
        <span className="header__sign-in">Sign in</span>
      </div>
    </nav>
  );
};

export default Header;
