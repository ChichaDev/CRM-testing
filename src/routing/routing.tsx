import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../modules/auth/LoginPage";
import RegisterPage from "../modules/auth/RegisterPage";
import { PassengerPage } from "../modules/passenger/PassengerPage";
import { DriverPage } from "../modules/driver/DriverPage";
import { DispatcherPage } from "../modules/dispatcher/DispatcherPage";
import { EditUsersPage } from "../modules/admin/EditUsersPage";
import { ErrorPage } from "../pages/ErrorPage";
import { Root } from "./Root";
import { Profile } from "../pages/Profile";
import { PrivateRoute } from "./hoc/ProtectedRoute";
import { PhoneAuthPage } from "../modules/auth/PhoneAuthPage";

export const defaultRouter = createBrowserRouter([
  {
    path: "/*",
    element: <Root />,
    children: [
      {
        path: "auth",
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "signup",
            element: <RegisterPage />,
          },
          {
            path: "phone",
            element: <PhoneAuthPage />,
          },
        ],
      },
      {
        path: "passenger",
        children: [
          {
            path: "page/*",
            element: (
              <PrivateRoute
                path="/"
                element={<PassengerPage />}
                allowedRoles={["passenger", "admin"]}
              />
            ),
          },
        ],
      },
      {
        path: "driver",
        children: [
          {
            path: "page/*",
            element: (
              <PrivateRoute
                allowedRoles={["driver", "admin"]}
                path="/"
                element={<DriverPage />}
              />
            ),
          },
        ],
      },
      {
        path: "dispatcher",
        children: [
          {
            path: "page/*",
            element: (
              <PrivateRoute
                allowedRoles={["dispatcher", "admin"]}
                path="/"
                element={<DispatcherPage />}
              />
            ),
          },
        ],
      },
      {
        path: "admin",
        children: [
          {
            path: "edituser/*",
            element: (
              <PrivateRoute
                allowedRoles={["admin"]}
                path="/"
                element={<EditUsersPage />}
              />
            ),
          },
        ],
      },
      {
        path: "profile",
        children: [
          {
            path: "dashboard/*",
            element: (
              <PrivateRoute
                allowedRoles={["admin", "passenger", "dispatcher", "driver"]}
                path="/"
                element={<Profile />}
              />
            ),
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
