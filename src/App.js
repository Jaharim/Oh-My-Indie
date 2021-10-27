import React, { useCallback, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect, Switch } from "react-router";
import { Link } from "react-router-dom";

import Main from "./main/pages/Main";
import Indie from "./indies/pages/Indie";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import SearchIndie from "./indies/pages/SearchIndie";
import Contact from "./contact/pages/Contact";
import IndieSupport from "./indies/components/IndieSupport";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/components/context/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/indie" exact>
          <SearchIndie />
        </Route>
        <Route path="/indie/:indieId" exact>
          <Indie />
        </Route>
        <Route path="/contact" exact>
          <Contact />
        </Route>
        <Route path="/indie/:indieId/support" exact>
          <IndieSupport />
        </Route>
        <Route path="/logout" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/indie" exact>
          <SearchIndie />
        </Route>
        <Route path="/indie/:indieId" exact>
          <Indie />
        </Route>
        <Route path="/contact" exact>
          <Contact />
        </Route>
        <Route path="/indie/:indieId/support" exact>
          <Auth />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
