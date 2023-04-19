import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/slice";
import tripsReducer from "./trips/slice";
import driversReducer from "./drivers/slice";
import editUsersReducer from "./editUsers/slice";

const rootReducer = combineReducers({
  user: userReducer,
  trips: tripsReducer,
  drivers: driversReducer,
  editUsers: editUsersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
