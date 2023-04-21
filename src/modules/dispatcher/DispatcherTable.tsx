import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import AddTripForm from "./AddTripForm";
import { fetchTripsAsync } from "../../store/trips/slice";
import { useAppDispatch } from "../../store/redux-hook";
import { deleteTrip } from "../../store/trips/actions";

import { fetchDrivers } from "../../store/drivers/action";

import moment from "moment";
import { Trips } from "../../types";
import DriverSelectModal from "./DriverSelectModal";

type Props = {
  trips: Trips[];
};

export const DispatcherTable: React.FC<Props> = ({ trips }) => {
  const [isAddTripFormOpen, setIsAddTripFormOpen] = useState(false);
  const [isAddDriverFormOpen, setIsDriverFormOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleDriverSelectOpen = () => {
    setIsDriverFormOpen(true);
  };

  const handleDriverSelectClose = () => {
    setIsDriverFormOpen(false);
  };

  useEffect(() => {
    dispatch(fetchDrivers());
  }, [dispatch]);

  const handleDeleteTrip = (id: string) => {
    dispatch(deleteTrip(id));
    alert("Поїздка видалена успішно");
    dispatch(fetchTripsAsync());
  };

  const handleAddTripOpen = () => {
    setIsAddTripFormOpen(true);
  };

  const handleAddTripClose = () => {
    setIsAddTripFormOpen(false);
  };

  return (
    <>
      <Table bordered hover style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Автомобіль</th>
            <th>Водій</th>
            <th>Звідки</th>
            <th>Куди</th>
            <th>Кількість пасажирів</th>
            <th>Ціна квитка</th>
            <th>Дата та час</th>
            <th>Видалити поїздку</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.carBrand}</td>
              <td>
                {trip.driver ? (
                  trip.driver
                ) : (
                  <Button variant="secondary" onClick={handleDriverSelectOpen}>
                    Выбрати водія
                  </Button>
                )}
              </td>
              {isAddDriverFormOpen && (
                <DriverSelectModal
                  tripId={trip.id}
                  show={true}
                  handleClose={handleDriverSelectClose}
                />
              )}
              <td>{trip.from}</td>
              <td>{trip.to}</td>
              <td>{trip.passengers}</td>
              <td>{trip.ticketPrice} грн</td>
              <td>{moment(trip.date).format("YYYY-MM-DDTHH:mm")}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteTrip(trip.id)}
                >
                  Видалити
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center mb-4">
        <Button onClick={handleAddTripOpen} variant="success">
          Додати поїздку
        </Button>
      </div>
      {isAddTripFormOpen && (
        <AddTripForm show={true} handleAddTripClose={handleAddTripClose} />
      )}
    </>
  );
};
