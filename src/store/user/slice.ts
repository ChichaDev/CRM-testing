import { createSlice } from "@reduxjs/toolkit";
import getFromLocalStorage from "../../utils/getFromLocalStorege";
import { fetchUser } from "./actions";
import { User } from "../../types";

const initialState: User = {
  email: "",
  id: "",
  phoneNumber: "",
  displayName: "",
  avatar: "",
  role: "",
  isLoggedIn: getFromLocalStorage("accessToken", false),
};
console.log("initialstate", initialState);

const userSlice = createSlice({
  name: "@user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.isLoggedIn = action.payload;
    },
    removeUser(state) {
      state.isLoggedIn = false;
      state.email = "";
      state.id = "";
      state.phoneNumber = "";
      state.displayName = "";
      state.avatar = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        // state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.email = action.payload.email || "";
        state.phoneNumber = action.payload.phoneNumber || "";
        state.id = action.payload.id;
        state.displayName = action.payload.displayName || "";
        state.avatar = action.payload.avatar || "";
        state.role = action.payload.role || "";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        // state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
