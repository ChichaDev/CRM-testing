import { Container } from "react-bootstrap";
import Trips from "../components/trips/Trips";

import { getTrips } from "../store/trips/selector";
import { fetchTripsAsync } from "../store/trips/slice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/redux-hook";

export const TripsPage = () => {
  const dispatch = useAppDispatch();
  const trips = useAppSelector(getTrips);

  useEffect(() => {
    dispatch(fetchTripsAsync());
  }, [dispatch]);

  return (
    <Container fluid>
      <Trips trips={trips} />
    </Container>
  );
};
