import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import AddTripForm from "../dispatcher/AddTripForm";
import { fetchTripsAsync } from "../../store/trips/slice";
import { useAppDispatch, useAppSelector } from "../../store/redux-hook";
import { deleteTrip } from "../../store/trips/actions";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { getDrivers } from "../../store/drivers/selector";
import { fetchDrivers } from "../../store/drivers/action";
import { authentication, db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getTrips } from "../../store/trips/selector";
import moment from "moment";
import { Trips } from "../../types";

type Props = {
  trips: Trips[];
};

export const AdminTable: React.FC<Props> = ({ trips }) => {
  const [selectedDriver, setSelectedDriver] = useState<string>("");
  const [isAddTripFormOpen, setIsAddTripFormOpen] = useState(false);

  const dispatch = useAppDispatch();

  const drivers = useAppSelector(getDrivers);
  const tripsAll = useAppSelector(getTrips);

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

  const handleBookTrip = async (tripId: string) => {
    const tripRef = doc(db, "trips", tripId);
    const tripData = await getDoc(tripRef);

    const passengers = tripData.data()?.passengers;
    const bookedUsers = tripData.data()?.bookedUsers || [];

    if (passengers === 0) {
      console.log("Невозможно забронировать поездку, все места заняты.");
      return;
    }

    const currentUser = authentication.currentUser?.uid;
    bookedUsers.push(currentUser);

    await updateDoc(tripRef, {
      passengers: passengers - 1,
      bookedUsers: bookedUsers,
    });

    dispatch(fetchTripsAsync());

    console.log("Поездка забронирована успешно");
  };

  const handleCancelBooking = async (tripId: string) => {
    const tripRef = doc(db, "trips", tripId);
    const tripData = await getDoc(tripRef);

    const passengers = tripData.data()?.passengers;
    const bookedUsers = tripData.data()?.bookedUsers || [];

    const currentUser = authentication.currentUser?.uid;
    const index = bookedUsers.indexOf(currentUser);

    if (index === -1) {
      console.log("Вы не забронировали эту поездку");
      return;
    }

    bookedUsers.splice(index, 1);

    await updateDoc(tripRef, {
      passengers: passengers + 1,
      bookedUsers: bookedUsers,
    });
    dispatch(fetchTripsAsync());
    console.log("Бронирование отменено успешно");
  };

  const currentUser = authentication.currentUser?.uid;

  const isTripBooked = (tripId: string): boolean => {
    const trip = tripsAll.find((trip) => trip.id === tripId);
    return (
      currentUser !== undefined &&
      (trip?.bookedUsers?.includes(currentUser) ?? false)
    );
  };

  const currentUserOne =
    authentication.currentUser?.displayName ||
    authentication.currentUser?.email;

  const handleAcceptDriver = async (
    driverId: string | undefined | null,
    tripId: string
  ) => {
    const tripRef = doc(db, "trips", tripId);
    try {
      await updateDoc(tripRef, {
        driver: driverId,
      });

      console.log("Driver added to trip successfully");
    } catch (error) {
      console.error("Error adding driver to trip: ", error);
    }

    dispatch(fetchTripsAsync());
  };

  const isTripHasDriver = (tripId: string): boolean => {
    const trip = tripsAll.find((trip) => trip.id === tripId);
    return (
      currentUserOne !== undefined &&
      (trip?.driver?.includes(currentUserOne) ?? false)
    );
  };

  const handleCancelDriver = async (tripId: string) => {
    const tripRef = doc(db, "trips", tripId);

    try {
      const tripSnapshot = await getDoc(tripRef);

      if (tripSnapshot.exists() && tripSnapshot.data()?.driver) {
        await updateDoc(tripRef, {
          driver: null,
        });

        dispatch(fetchTripsAsync());

        console.log("Поле 'driver' удалено из документа с ID:", tripId);
      } else {
        console.warn("Поле 'driver' не найдено в документе с ID:", tripId);
      }
    } catch (error) {
      console.error("Ошибка при удалении поля 'driver':", error);
    }
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
            <th>Бронирование поездки</th>
            <th>Регистрация водителя</th>
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
              <td>
                {isTripBooked(trip.id) ? (
                  <Button
                    onClick={() => handleCancelBooking(trip.id)}
                    variant="danger"
                    size="sm"
                  >
                    Отменить бронь
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleBookTrip(trip.id)}
                    variant="success"
                    size="sm"
                  >
                    Забронировать
                  </Button>
                )}
              </td>
              <td>
                {isTripHasDriver(trip.id) ? (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      handleCancelDriver(trip.id);
                    }}
                  >
                    Отменить заказ
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAcceptDriver(currentUserOne, trip.id)}
                  >
                    Принять заказ
                  </Button>
                )}
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
