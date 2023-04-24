import { useEffect } from "react";

import { Container } from "react-bootstrap";

import { DispatcherTable } from "./DispatcherTable";

import { useAppDispatch, useAppSelector } from "../../store/redux-hook";
import { getTrips } from "../../store/trips/selector";
import { fetchTripsAsync } from "../../store/trips/slice";

export const DispatcherPage = () => {
  const dispatch = useAppDispatch();
  const trips = useAppSelector(getTrips);
  const dispatcherTrips = trips.filter(
    (trip) => trip.driver == null && trip.driver == undefined
  );

  useEffect(() => {
    dispatch(fetchTripsAsync());
  }, [dispatch]);

  return (
    <Container fluid>
      <DispatcherTable trips={dispatcherTrips} />
    </Container>
  );
};
