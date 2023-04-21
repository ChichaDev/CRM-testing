import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hook";
import { getTrips } from "../../store/trips/selector";
import { fetchTripsAsync } from "../../store/trips/slice";
import { Container } from "react-bootstrap";
import { PassengerTable } from "./PassengerTable";

export const PassengerPage = () => {
  const dispatch = useAppDispatch();
  const trips = useAppSelector(getTrips);
  const passengerTrips = trips.filter(
    (trip) => trip.driver !== null && trip.driver !== undefined
  );

  useEffect(() => {
    dispatch(fetchTripsAsync());
  }, [dispatch]);

  return (
    <Container fluid>
      <PassengerTable trips={passengerTrips} />
    </Container>
  );
};
