import { useEffect } from "react";

import { Container } from "react-bootstrap";

import { DriverTable } from "./DriverTable";

import { useAppDispatch, useAppSelector } from "../../store/redux-hook";
import { getTrips } from "../../store/trips/selector";
import { fetchTripsAsync } from "../../store/trips/slice";

export const DriverPage = () => {
  const dispatch = useAppDispatch();
  const trips = useAppSelector(getTrips);
  const driverTrips = trips.filter(
    (trip) => trip.driver == null && trip.driver == undefined
  );

  useEffect(() => {
    dispatch(fetchTripsAsync());
  }, [dispatch]);

  return (
    <Container fluid>
      <DriverTable trips={driverTrips} />
    </Container>
  );
};
