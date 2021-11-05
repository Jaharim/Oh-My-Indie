import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  isAdmin: false,
  adminLogin: () => {},
  adminLogout: () => {},
  login: () => {},
  logout: () => {},
});
