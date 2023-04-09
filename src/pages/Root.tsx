import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { useAppSelector } from "../store/redux-hook";
import { getIsLoggedInStatus } from "../store/user/selector";

export const Root = () => {
  const logged = useAppSelector(getIsLoggedInStatus);

  return (
    <>
      {logged && <Header />}
      <main>
        <Outlet />
      </main>
    </>
  );
};
