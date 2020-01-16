import React from "react";
import "./Main.scss";

const Main = ({ children, className }) => {
  return <main className={`main ${className || ""}`}>{children}</main>;
};

export default Main;
