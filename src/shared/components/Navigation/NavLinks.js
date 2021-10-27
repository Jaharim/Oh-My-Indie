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
    history.replace("/");
  };

  return (
    <ul className="nav-links">
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
          <NavLink to="/contact">SIGN UP</NavLink>
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
