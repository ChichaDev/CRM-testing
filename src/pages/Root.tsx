import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export const Root = () => {
  const isLoggedIn = false;

  return (
    <>
      {isLoggedIn && <Header />}
      <main>
        <Outlet />
      </main>
    </>
  );
};
