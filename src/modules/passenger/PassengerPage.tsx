import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hook";

import { fetchTripsAsync } from "../../store/trips/slice";
import { Container } from "react-bootstrap";
import { PassengerTable } from "./PassengerTable";
import { Search } from "../../components/Search";
import { getTrips } from "../../store/trips/selector";

type SearchParams = {
  from: string;
  to: string;
  date: Date;
};

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
  console.log("filteredTrips", filteredTrips);

  const handleSearch = (searchParams: SearchParams) => {
    const filtered = passengerTrips.filter((trip) => {
      const { from, to, date } = searchParams;

      console.log(searchParams);

      const isFromMatched =
        from === "" || trip.from.toLowerCase().includes(from.toLowerCase());
      const isToMatched =
        to === "" || trip.to.toLowerCase().includes(to.toLowerCase());
      const isDateMatched =
        date === null || trip.date.toString() === date.toDateString();
      return isFromMatched && isToMatched && isDateMatched;
    });

    setFilteredTrips(filtered);
  };

  return (
    <Container fluid>
      <Search onSearch={handleSearch} />
      <PassengerTable trips={filteredTrips} />
    </Container>
  );
};
