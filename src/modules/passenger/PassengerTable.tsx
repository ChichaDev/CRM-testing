import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { fetchTripsAsync } from "../../store/trips/slice";
import { useAppDispatch, useAppSelector } from "../../store/redux-hook";

import { authentication, db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getTrips } from "../../store/trips/selector";
import moment from "moment";
import { Trips } from "../../types";

type Props = {
  trips: Trips[];
};

export const PassengerTable: React.FC<Props> = ({ trips }) => {
  const dispatch = useAppDispatch();

  const tripsAll = useAppSelector(getTrips);

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

            <th>Бронирование поездки</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.carBrand}</td>
              <td>{trip.driver || "---"}</td>
              <td>{trip.from}</td>
              <td>{trip.to}</td>
              <td>{trip.passengers}</td>
              <td>{trip.ticketPrice}</td>
              <td>{moment(trip.date).format("YYYY-MM-DDTHH:mm")}</td>

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
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
