import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hook";
import { getTrips } from "../../store/trips/selector";
import { fetchTripsAsync } from "../../store/trips/slice";
import { Container } from "react-bootstrap";

import { DriverTable } from "./DriverTable";

export const DriverPage = () => {
  const dispatch = useAppDispatch();
  const trips = useAppSelector(getTrips);

  useEffect(() => {
    dispatch(fetchTripsAsync());
  }, [dispatch]);

  return (
    <Container fluid>
      <DriverTable trips={trips} />
    </Container>
  );
};
