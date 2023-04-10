import { createSlice } from "@reduxjs/toolkit";
import getFromLocalStorage, {
  DeserializedValue,
} from "../../utils/getFromLocalStorege";

type UserAuth = {
  email: string;
  token: string;
  id: string;
  isLoggedIn: DeserializedValue;
};

const initialState: UserAuth = {
  email: "",
  token: "",
  id: "",
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
      state.isLoggedIn = action.payload;
    },
    removeUser(state) {
      state.email = "";
      state.token = "";
      state.id = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
