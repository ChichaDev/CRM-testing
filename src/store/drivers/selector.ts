import { RootState } from "../store";

export const getDrivers = (state: RootState) => state.drivers.driversList;
