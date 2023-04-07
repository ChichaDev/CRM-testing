import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  redirectPath: string;
  children: JSX.Element;
};

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { redirectPath, children } = props;

  const isLoggedIn = false;

  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} state={{ from: location }} />;
  }

  return children;
};
