import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { useAppSelector } from "../store/redux-hook";
import { getIsLoggedInStatus } from "../store/user/selector";

import { useEffect } from "react";

export const Root = () => {
  const tokenCheck = useAppSelector(getIsLoggedInStatus);

  const navigate = useNavigate();

  useEffect(() => {
    if (tokenCheck) {
      navigate("/tripspage", { replace: true });
    }

    if (!tokenCheck) {
      navigate("/login", { replace: true });
    }
  }, [tokenCheck]);
  return (
    <>
      {tokenCheck && <Header />}
      <Outlet />
    </>
  );
};
