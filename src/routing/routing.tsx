import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Root } from "../pages/Root";
import { HomePage } from "../pages/HomePage";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import { ProtectedRoute } from "./hoc/ProtectedRoute";

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
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
  )
);
