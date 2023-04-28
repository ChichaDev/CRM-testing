import { useEffect, useState } from "react";

import { Container } from "react-bootstrap";

import { PassengerTable } from "./PassengerTable";
import { Search, SearchParams } from "../../components/Search";
import { SortByDate, SortOrder } from "../../components/SortByDate";

import { useAppDispatch, useAppSelector } from "../../store/redux-hook";
import { fetchTripsAsync } from "../../store/trips/slice";
import { getPassengerTrips } from "../../store/trips/selector";

import { Trips } from "../../types";
import { filterTrips } from "../../services/filterTrips";

export const PassengerPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTripsAsync());
  }, []);

  const trips = useAppSelector(getPassengerTrips);

  const [filteredTrips, setFilteredTrips] = useState(trips);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: "",
    to: "",
    date: "",
  });
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  useEffect(() => {
    if (trips !== filteredTrips) {
      setFilteredTrips(trips);
    }
  }, [trips]);

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    const filtered = filterTrips(trips, params);
    setFilteredTrips(filtered);
  };

  const handleClear = () => {
    setSearchParams({ from: "", to: "", date: "" });
    setFilteredTrips(trips);
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
