import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Root } from "./Root";
import { AdminPage } from "../modules/admin/AdminPage";

import { ProtectedRoute } from "./hoc/ProtectedRoute";
import { Profile } from "../pages/Profile";
import LoginPage from "../modules/auth/LoginPage";
import RegisterPage from "../modules/auth/RegisterPage";
import { EditUsersPage } from "../modules/admin/EditUsersPage";
import { PhoneAuthPage } from "../modules/auth/PhoneAuthPage";
import { ErrorPage } from "../pages/ErrorPage";
import { DriverCalendar } from "../modules/driver/DriverCalendar";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route
        path="/calendar"
        element={
          <ProtectedRoute redirectPath="/login">
            <DriverCalendar />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tripspage"
        element={
          <ProtectedRoute redirectPath="/login">
            <AdminPage />
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
