import { RootState } from "../store";

export const getTrips = (state: RootState) => state.trips.tripsList;
