import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";

import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [sideDrawerState, setSideDrawerState] = useState(false);

  const sideDrawerHandler = () => {
    setSideDrawerState(true);
  };

  const sideDrawerCloseHandler = () => {
    setSideDrawerState(false);
  };

  return (
    <React.Fragment>
      {sideDrawerState && (
        <SideDrawer>
          <nav className="main-navigation__drawer-nav">
            <NavLinks onClick={sideDrawerCloseHandler} />
          </nav>
        </SideDrawer>
      )}
      <MainHeader>
        <div className="main-navigation__menu-btn" onClick={sideDrawerHandler}>
          <span />
          <span />
          <span />
        </div>
        <h1 className="main-navigation__title">
          <Link to="/">Oh, My Indie</Link>
        </h1>
        <nav className="main-navigation__links">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
