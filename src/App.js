import React from "react";
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

function App() {
  return (
    <Router>
      <MainNavigation />
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
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
