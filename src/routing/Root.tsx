import { useEffect } from "react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { Header } from "../components/nav/Header";

import { useAppSelector } from "../store/redux-hook";
import { getIsLoggedInStatus } from "../store/user/selector";

export const Root = () => {
  const isLoggedIn = useAppSelector(getIsLoggedInStatus);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn && location.pathname === "/") {
      navigate("/profile/dashboard", { replace: true });
    } else if (
      !isLoggedIn &&
      !["/auth/login", "/auth/signup", "/auth/phone"].includes(
        location.pathname
      )
    ) {
      navigate("/auth/login", { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  if (
    !isLoggedIn &&
    !["/auth/login", "/auth/signup", "/auth/phone"].includes(location.pathname)
  ) {
    return null;
  }

  return (
    <>
      {isLoggedIn && <Header />}
      <Outlet />
    </>
  );
};
