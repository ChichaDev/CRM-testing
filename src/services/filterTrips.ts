import moment from "moment";
import { Trips } from "../types";
import { SearchParams } from "../components/Search";

export const filterTrips = (
  trips: Trips[],
  searchParams: SearchParams
): Trips[] => {
  const { from, to, date } = searchParams;

  return trips.filter((trip) => {
    const isFromMatched =
      from === "" || trip.from.toLowerCase().includes(from.toLowerCase());

    const isToMatched =
      to === "" || trip.to.toLowerCase().includes(to.toLowerCase());

    const isDateMatched =
      date === null || moment(trip.date).isSame(moment(date), "day");

    return isFromMatched && isToMatched && isDateMatched;
  });
};
