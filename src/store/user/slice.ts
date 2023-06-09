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
      state.role = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.email = action.payload.email || "";
      state.phoneNumber = action.payload.phoneNumber || "";
      state.id = action.payload.id;
      state.displayName = action.payload.displayName || "";
      state.avatar = action.payload.avatar || "";
      state.role = action.payload.role || "";
    });
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
