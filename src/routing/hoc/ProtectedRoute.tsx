import { Navigate, Route, Routes } from "react-router-dom";

import { useAppSelector } from "../../store/redux-hook";
import { getIsLoggedInStatus, getUserRole } from "../../store/user/selector";

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
  allowedRoles: string[];
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  element,
  allowedRoles,
}) => {
  const isLoggedIn = useAppSelector(getIsLoggedInStatus);

  const userRole = useAppSelector(getUserRole);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  if (userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/error" />;
  }

  return (
    <Routes>
      <Route path={path} element={element} />
    </Routes>
  );
};
