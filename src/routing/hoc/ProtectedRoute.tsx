import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/redux-hook";
import { getIsLoggedInStatus } from "../../store/user/selector";

type ProtectedRouteProps = {
  redirectPath: string;
  children: JSX.Element;
};

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { redirectPath, children } = props;

  const token = useAppSelector(getIsLoggedInStatus);

  const location = useLocation();

  if (!token) {
    return <Navigate to={redirectPath} state={{ from: location }} />;
  }

  return children;
};
