import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Trips } from "../../types";

export const getTrips = (state: RootState) => state.trips.tripsList;

export const getStatusTrips = (state: RootState) => state.trips.status;

export const getPassengerTrips = createSelector(
  (state: RootState) => state.trips.tripsList,
  (trips: Trips[]) =>
    trips.filter((trip) => trip.driver !== null && trip.driver !== undefined)
);
