import { RootState } from "../store";

export const getTrips = (state: RootState) => state.trips.tripsList;

export const getStatusTrips = (state: RootState) => state.trips.status;
