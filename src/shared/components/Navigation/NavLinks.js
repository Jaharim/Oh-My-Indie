import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = (props) => {
  return (
    <ul>
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
      <li>
        <NavLink to="/auth">LOGIN</NavLink>
      </li>
      <li>
        <NavLink to="/contact">SIGN UP</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
