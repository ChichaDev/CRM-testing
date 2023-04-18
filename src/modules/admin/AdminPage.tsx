import { Container } from "react-bootstrap";
import { AdminTable } from "./AdminTable";

import { getTrips } from "../../store/trips/selector";
import { fetchTripsAsync } from "../../store/trips/slice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hook";

export const AdminPage = () => {
  const dispatch = useAppDispatch();
  const trips = useAppSelector(getTrips);

  useEffect(() => {
    dispatch(fetchTripsAsync());
  }, [dispatch]);

  return (
    <Container fluid>
      <AdminTable trips={trips} />
    </Container>
  );
};
