import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./urql-logo.svg";

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img width={50} src={logo} alt="logo" />
        </NavLink>
      </div>
    </nav>
  );
};
