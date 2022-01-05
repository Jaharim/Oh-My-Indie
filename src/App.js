import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect, Switch } from "react-router";

import { AuthContext } from "./shared/components/context/auth-context";

import { useAuth } from "./shared/components/context/auth-hook";

import MyPage from "./mypage/pages/MyPage";
/* import Main from "./main/pages/Main";
import Indie from "./indies/pages/Indie";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import SearchIndie from "./indies/pages/SearchIndie";
import Contact from "./contact/pages/Contact";
import IndieSupport from "./indies/components/IndieSupport";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/components/context/auth-context";
import Signup from "./user/pages/Signup";
import Admin from "./admin/pages/Admin";
import { useAuth } from "./shared/components/context/auth-hook";
import ContactAdmin from "./admin/components/ContactAdmin";
import MyPage from "./mypage/pages/MyPage";
import MySupportMsg from "./mypage/components/MySupportMsg";
import MyContactMsg from "./mypage/components/MyContactMsg";
import SupportMsgAdmin from "./admin/components/SupportMsgAdmin";
import CompleteContactMsg from "./admin/components/CompleteContactMsg"; */

const Main = React.lazy(() => import("./main/pages/Main"));
const Indie = React.lazy(() => import("./indies/pages/Indie"));
const MainNavigation = React.lazy(() =>
  import("./shared/components/Navigation/MainNavigation")
);
const SearchIndie = React.lazy(() => import("./indies/pages/SearchIndie"));
const Contact = React.lazy(() => import("./contact/pages/Contact"));
const IndieSupport = React.lazy(() =>
  import("./indies/components/IndieSupport")
);
const Auth = React.lazy(() => import("./user/pages/Auth"));

const Signup = React.lazy(() => import("./user/pages/Signup"));
const Admin = React.lazy(() => import("./admin/pages/Admin"));

const ContactAdmin = React.lazy(() =>
  import("./admin/components/ContactAdmin")
); /* 
const MyPage = React.lazy(() => import("./mypage/pages/MyPage")); */
const MySupportMsg = React.lazy(() =>
  import("./mypage/components/MySupportMsg")
);
const MyContactMsg = React.lazy(() =>
  import("./mypage/components/MyContactMsg")
);
const SupportMsgAdmin = React.lazy(() =>
  import("./admin/components/SupportMsgAdmin")
);
const CompleteContactMsg = React.lazy(() =>
  import("./admin/components/CompleteContactMsg")
);
const Loading = React.lazy(() =>
  import("./shared/components/UIElements/Loading")
);

function App() {
  const { token, login, logout, isAdmin } = useAuth();
  const [errorSubmit, setErrorSubmit] = useState(false);

  const errorRedirectHandler = () => {
    setErrorSubmit(true);
  };

  let routes;

  if (token) {
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
        {!isAdmin && (
          <Route path="/mypage" exact>
            <MyPage />
          </Route>
        )}
        {!isAdmin && (
          <Route path="/mypage/support" exact>
            <MySupportMsg />
          </Route>
        )}
        {!isAdmin && (
          <Route path="/mypage/contact" exact>
            <MyContactMsg />
          </Route>
        )}
        {isAdmin && (
          <Route path="/admin" exact>
            <Admin />
          </Route>
        )}
        {isAdmin && (
          <Route path="/admin/contact" exact>
            <ContactAdmin />
          </Route>
        )}
        {isAdmin && (
          <Route path="/admin/contact/complete" exact>
            <CompleteContactMsg />
          </Route>
        )}
        {isAdmin && (
          <Route path="/admin/support" exact>
            <SupportMsgAdmin />
          </Route>
        )}
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
          <Indie onErrorSubmit={errorRedirectHandler} />
          {errorSubmit && <Redirect to="/indie" />}
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
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
        isAdmin: isAdmin,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
