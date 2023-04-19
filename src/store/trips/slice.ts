import { createSlice } from "@reduxjs/toolkit";
import { deleteTrip, fetchTrips } from "./actions";
import { AppDispatch } from "../store";
import { Trips } from "../../types";

type TripsSlice = {
  tripsList: Trips[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
};

const initialState: TripsSlice = {
  tripsList: [],
  status: "idle",
  error: null,
};
const tripsSlice = createSlice({
  name: "@trips",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tripsList = action.payload;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(deleteTrip.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTrip.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteTrip.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const fetchTripsAsync = () => (dispatch: AppDispatch) => {
  dispatch(fetchTrips());
};

export default tripsSlice.reducer;
