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

// import { Navigate, useLocation } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../store/redux-hook";
// import { getIsLoggedInStatus, getUserRole } from "../../store/user/selector";
// import { useMemo } from "react";
// import { fetchUserRole } from "../../store/user/actions";

// type ProtectedRouteProps = {
//   children: JSX.Element;
//   allowedRoles: string[];
//   redirectPath: string;
// };

// export const ProtectedRoute = (props: ProtectedRouteProps) => {
//   const { children, allowedRoles, redirectPath } = props;
//   const isLoggedIn = useAppSelector(getIsLoggedInStatus);
//   const dispatch = useAppDispatch();
//   const location = useLocation();

//   const userRole = useAppSelector(useMemo(() => getUserRole, [dispatch])) || "";
//   console.log("USER ROLE PROTECD", userRole);

//   if (!isLoggedIn) {
//     return <Navigate to={redirectPath} state={{ from: location }} />;
//   }

//   if (!allowedRoles.includes(userRole)) {
//     return <Navigate to="/error" />;
//   }

//   return children;
// };
