import { createSlice } from "@reduxjs/toolkit";
import getFromLocalStorage, {
  DeserializedValue,
} from "../../utils/getFromLocalStorege";

type UserAuth = {
  email?: string;
  phoneNumber?: string;
  id: string;
  displayName: string;
  isLoggedIn: DeserializedValue;
};

const initialState: UserAuth = {
  email: "",
  id: "",
  phoneNumber: "",
  displayName: "",
  isLoggedIn: getFromLocalStorage("refreshToken", false),
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
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
