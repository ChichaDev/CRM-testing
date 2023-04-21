import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Root } from "./Root";

import { ProtectedRoute } from "./hoc/ProtectedRoute";
import { Profile } from "../pages/Profile";
import LoginPage from "../modules/auth/LoginPage";
import RegisterPage from "../modules/auth/RegisterPage";
import { EditUsersPage } from "../modules/admin/EditUsersPage";
import { PhoneAuthPage } from "../modules/auth/PhoneAuthPage";
import { ErrorPage } from "../pages/ErrorPage";

import { DriverPage } from "../modules/driver/DriverPage";
import { PassengerPage } from "../modules/passenger/PassengerPage";
import { DispatcherPage } from "../modules/dispatcher/DispatcherPage";
import { DriverTrips } from "../modules/driver/DriverTrips";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route
        path="/tripspage"
        element={
          <ProtectedRoute redirectPath="/login">
            <PassengerPage />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/driverpage"
        element={
          <ProtectedRoute redirectPath="/login">
            <DriverPage />
          </ProtectedRoute>
        }
      /> */}

      {/* <Route
        path="/passengertrips"
        element={
          <ProtectedRoute redirectPath="/login">
            <PassengerPage />
          </ProtectedRoute>
        }
      /> */}

      {/* <Route
        path="/dispatchertrips"
        element={
          <ProtectedRoute redirectPath="/login">
            <DispatcherPage />
          </ProtectedRoute>
        }
      /> */}

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
