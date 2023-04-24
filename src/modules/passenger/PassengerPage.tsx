import { useEffect, useState } from "react";

import { Container } from "react-bootstrap";

import { PassengerTable } from "./PassengerTable";
import { Search } from "../../components/Search";
import { SortByDate } from "../../components/SortByDate";

import { useAppDispatch, useAppSelector } from "../../store/redux-hook";
import { fetchTripsAsync } from "../../store/trips/slice";
import { getTrips } from "../../store/trips/selector";

import moment from "moment";

import { Trips } from "../../types";

type SearchParams = {
  from: string;
  to: string;
  date: string;
};

type SortOrder = "asc" | "desc";

export const PassengerPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTripsAsync());
  }, []);

  const trips = useAppSelector(getTrips);

  const passengerTrips = trips.filter(
    (trip) => trip.driver !== null && trip.driver !== undefined
  );

  const [filteredTrips, setFilteredTrips] = useState(passengerTrips);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: "",
    to: "",
    date: "",
  });
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  useEffect(() => {
    if (trips !== filteredTrips) {
      setFilteredTrips(passengerTrips);
    }
  }, [trips]);

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    const filtered = passengerTrips.filter((trip) => {
      const { from, to, date } = params;

      const isFromMatched =
        from === "" || trip.from.toLowerCase().includes(from.toLowerCase());
      const isToMatched =
        to === "" || trip.to.toLowerCase().includes(to.toLowerCase());

      const isDateMatched =
        date === null || moment(trip.date).isSame(moment(date), "day");

      return isFromMatched && isToMatched && isDateMatched;
    });

    setFilteredTrips(filtered);
  };

  const handleClear = () => {
    setSearchParams({ from: "", to: "", date: "" });
    setFilteredTrips(passengerTrips);
    setSortOrder("asc");
  };

  const handleSort = (sortedTrips: Trips[]) => {
    setFilteredTrips(sortedTrips);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Container fluid>
      <Search onSearch={handleSearch} onClear={handleClear} />

      <SortByDate
        trips={filteredTrips}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      <PassengerTable trips={filteredTrips} />
    </Container>
  );
};
