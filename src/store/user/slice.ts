import { createSlice } from "@reduxjs/toolkit";
import getFromLocalStorage from "../../utils/getFromLocalStorege";

const initialState = {
  email: null,
  token: null,
  id: null,
  isLoggedIn: getFromLocalStorage("currentUser", false),
};
console.log("initialstate", initialState);

const userSlice = createSlice({
  name: "@user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
