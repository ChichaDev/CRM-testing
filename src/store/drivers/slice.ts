import { createSlice } from "@reduxjs/toolkit";
import { fetchDrivers } from "./action";
import { Driver } from "../../types";

// export type Driver = {
//   id: string;
//   driver?: string;
// };

type DriverSlice = {
  driversList: Driver[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
};

const initialState: DriverSlice = {
  driversList: [],
  status: "idle",
  error: null,
};

const driverSlice = createSlice({
  name: "@drivers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDrivers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchDrivers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.driversList = action.payload;
    });
    builder.addCase(fetchDrivers.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default driverSlice.reducer;
