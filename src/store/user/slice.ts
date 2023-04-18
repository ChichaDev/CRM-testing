import { createSlice } from "@reduxjs/toolkit";
import getFromLocalStorage, {
  DeserializedValue,
} from "../../utils/getFromLocalStorege";
import { fetchUser } from "./actions";

type UserAuth = {
  email?: string;
  phoneNumber?: string;
  id: string;
  displayName?: string;
  // avatar: string;
  isLoggedIn: DeserializedValue;
};

const initialState: UserAuth = {
  email: "",
  id: "",
  phoneNumber: "",
  displayName: "",
  // avatar: "",
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        // state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.email = action.payload.email || "";
        state.phoneNumber = action.payload.phoneNumber || "";
        state.id = action.payload.id;
        state.displayName = action.payload.displayName || "";
        // state.avatar = action.payload.avatar || "";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        // state.isLoading = false;
        // state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
