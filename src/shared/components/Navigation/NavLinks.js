import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useHistory } from "react-router";

import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.replace("/auth");
  };

  return (
    <ul
      className="nav-links"
      onClick={() => {
        if (props.onClick) props.onClick();
      }}
    >
      <li>
        <NavLink to="/" exact>
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink to="/indie">MY INDIE</NavLink>
      </li>
      <li>
        <NavLink to="/contact">CONTACT</NavLink>
      </li>
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">LOGIN</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/signup">SIGN UP</NavLink>
        </li>
      )}
      {auth.isAdmin && (
        <li>
          <NavLink to="/admin">ADMIN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && !auth.isAdmin && (
        <li>
          <NavLink to="/mypage">MY PAGE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/logout" onClick={logoutHandler}>
            LOGOUT
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
