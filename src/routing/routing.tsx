import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Root } from "../pages/Root";
import { TripsPage } from "../pages/TripsPage";

import { ProtectedRoute } from "./hoc/ProtectedRoute";
import { Profile } from "../pages/Profile";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { EditUsersPage } from "../pages/EditUsersPage";
import { PhoneAuthPage } from "../pages/PhoneAuthPage";
import { ErrorPage } from "../pages/ErrorPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route
        path="/tripspage"
        element={
          <ProtectedRoute redirectPath="/login">
            <TripsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute redirectPath="/login">
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edituser"
        element={
          <ProtectedRoute redirectPath="/login">
            <EditUsersPage />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/signup" element={<RegisterPage />} />

      <Route path="/phoneauth" element={<PhoneAuthPage />} />

      <Route
        path="*"
        element={
          <ProtectedRoute redirectPath="/login">
            <ErrorPage />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);
