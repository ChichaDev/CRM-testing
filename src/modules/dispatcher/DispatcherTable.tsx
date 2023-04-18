import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import AddTripForm from "./AddTripForm";
import { Trips, fetchTripsAsync } from "../../store/trips/slice";
import { useAppDispatch, useAppSelector } from "../../store/redux-hook";
import { deleteTrip } from "../../store/trips/actions";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { getDrivers } from "../../store/drivers/selector";
import { fetchDrivers } from "../../store/drivers/action";
import { db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import moment from "moment";

type Props = {
  trips: Trips[];
};

export const DispatcherTable: React.FC<Props> = ({ trips }) => {
  const [selectedDriver, setSelectedDriver] = useState<string>("");
  const [isAddTripFormOpen, setIsAddTripFormOpen] = useState(false);

  const dispatch = useAppDispatch();

  const drivers = useAppSelector(getDrivers);

  const handleDriverSelect = async (driverId: string, tripId: string) => {
    const tripRef = doc(db, "trips", tripId);
    const driverRef = doc(db, "drivers", driverId);

    try {
      const driverSnapshot = await getDoc(driverRef);
      const driverName = driverSnapshot.data()?.driver;

      await updateDoc(tripRef, {
        driver: driverName,
      });

      console.log("Driver added to trip successfully");
    } catch (error) {
      console.error("Error adding driver to trip: ", error);
    }

    setSelectedDriver("");
    dispatch(fetchTripsAsync());
  };

  useEffect(() => {
    dispatch(fetchDrivers());
  }, [dispatch]);

  const handleDeleteTrip = (id: string) => {
    dispatch(deleteTrip(id));
    console.log("Trip deleted");
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
            <th>Марка машины</th>
            <th>Водитель</th>
            <th>Откуда</th>
            <th>Куда</th>
            <th>Количество пассажиров</th>
            <th>Стоимость билета</th>
            <th>Дата и время</th>
            <th>Удалить поездку</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.carBrand}</td>
              <td>
                {trip.driver || (
                  <DropdownButton
                    variant="secondary"
                    title={
                      selectedDriver ? selectedDriver : "Выберите водителя"
                    }
                  >
                    {drivers.map((driver) => (
                      <Dropdown.Item
                        key={driver.id}
                        onClick={() => handleDriverSelect(driver.id, trip.id)}
                      >
                        {driver.driver}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                )}
              </td>
              <td>{trip.from}</td>
              <td>{trip.to}</td>
              <td>{trip.passengers}</td>
              <td>{trip.ticketPrice}</td>
              <td>{moment(trip.date).format("YYYY-MM-DDTHH:mm")}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteTrip(trip.id)}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center mb-4">
        <Button onClick={handleAddTripOpen} variant="success">
          Добавить поездку
        </Button>
      </div>
      {isAddTripFormOpen && (
        <AddTripForm show={true} handleAddTripClose={handleAddTripClose} />
      )}
    </>
  );
};
