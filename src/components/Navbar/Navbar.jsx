import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";

export const Navbar = (props) => {
  return (
    <nav className="navbar navbar-dark bg-dark ">
      <div className="navbar-brand ">My social network</div>
      <div className={classes.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} <button onClick={props.logout}>Logout</button>
          </div>
        ) : (
          <NavLink to={"/login"} color="secondary">
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};
