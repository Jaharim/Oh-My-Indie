import React from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

import "./MainNavigation.css";

const MainNavigation = (props) => {
  return (
    <MainHeader>
      <h1 className="main-navigation__title">
        <Link to="/">Oh, My Indie</Link>
      </h1>
      <nav className="main-navigation__links">
        <NavLinks />
      </nav>
    </MainHeader>
  );
};

export default MainNavigation;
