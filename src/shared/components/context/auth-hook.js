import { useState, useEffect, useCallback } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, settokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [status, setStatus] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = useCallback((uid, token, st, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setStatus(st);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    settokenExpirationDate(tokenExpirationDate);
    if (st === "admin") {
      setIsAdmin(true);
    }
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        status: st,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setStatus(null);
    settokenExpirationDate(null);
    setIsAdmin(false);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      storedData.status &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.status,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId, isAdmin, status };
};
