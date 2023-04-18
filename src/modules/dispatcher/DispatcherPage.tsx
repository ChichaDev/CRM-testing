import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hook";
import { getTrips } from "../../store/trips/selector";
import { fetchTripsAsync } from "../../store/trips/slice";
import { Container } from "react-bootstrap";
import { DispatcherTable } from "./DispatcherTable";

export const DispatcherPage = () => {
  const dispatch = useAppDispatch();
  const trips = useAppSelector(getTrips);

  useEffect(() => {
    dispatch(fetchTripsAsync());
  }, [dispatch]);

  return (
    <Container fluid>
      <DispatcherTable trips={trips} />
    </Container>
  );
};
