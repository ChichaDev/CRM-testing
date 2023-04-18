import type { RootState } from "../store";

export const getIsLoggedInStatus = (state: RootState) => state.user.isLoggedIn;

export const getUserInfo = (state: RootState) => state.user;

export const getUserID = (state: RootState) => state.user.id;
