import React from "react";
import "./Main.scss";

const Main = ({ children, className }) => {
  return <main className={`main ${className || ""}`}>{children} lolo</main>;
};

export default Main;
