import type { RootState } from "../store";

export const getIsLoggedInStatus = (state: RootState) => state.user.isLoggedIn;
