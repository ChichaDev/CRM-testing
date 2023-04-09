import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Root } from "../pages/Root";
import { HomePage } from "../pages/HomePage";

import { ProtectedRoute } from "./hoc/ProtectedRoute";
import { Profile } from "../pages/Profile";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { EditUsersPage } from "../pages/EditUsersPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route
        path="/homepage"
        element={
          <ProtectedRoute redirectPath="/login">
            <HomePage />
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
    </Route>
  )
);
