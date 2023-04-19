import { createSlice } from "@reduxjs/toolkit";
import { addRole, fetchUsers, removeRole } from "./actions";
import { User } from "../../types";

type EditUsersSlice = {
  users: User[];
};

const initialState: EditUsersSlice = {
  users: [],
};

const editUsersSlice = createSlice({
  name: "editUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        const updatedUsers = state.users.map((user) => {
          if (user.id === action.meta.arg.userId) {
            return { ...user, role: action.meta.arg.role };
          }
          return user;
        });
        state.users = updatedUsers;
        return state;
      })
      .addCase(removeRole.fulfilled, (state, action) => {
        const updatedUsers = state.users.map((user) => {
          if (user.id === action.meta.arg) {
            return { ...user, role: undefined };
          }
          return user;
        });
        state.users = updatedUsers;
        return state;
      });
  },
});

export default editUsersSlice.reducer;
