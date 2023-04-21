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
      alert("Неможливо забронювати поїдку, всі місця зайняті");
      return;
    }

    const currentUser = authentication.currentUser?.uid;
    bookedUsers.push(currentUser);

    await updateDoc(tripRef, {
      passengers: passengers - 1,
      bookedUsers: bookedUsers,
    });

    dispatch(fetchTripsAsync());

    alert("Поїздка заброньована успішно");
  };

  const handleCancelBooking = async (tripId: string) => {
    const tripRef = doc(db, "trips", tripId);
    const tripData = await getDoc(tripRef);

    const passengers = tripData.data()?.passengers;
    const bookedUsers = tripData.data()?.bookedUsers || [];

    const currentUser = authentication.currentUser?.uid;
    const index = bookedUsers.indexOf(currentUser);

    if (index === -1) {
      alert("Ви не забронювали цю поїздку, всі місця зайняті");
      return;
    }

    bookedUsers.splice(index, 1);

    await updateDoc(tripRef, {
      passengers: passengers + 1,
      bookedUsers: bookedUsers,
    });
    dispatch(fetchTripsAsync());
    alert("Бронювання завершено успішно");
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
            <th>Автомобіль</th>
            <th>Водій</th>
            <th>Звідки</th>
            <th>Куди</th>
            <th>Кількість пасажирів</th>
            <th>Ціна квитка</th>
            <th>Дата та час</th>

            <th>Бронювання поїздки</th>
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
              <td>{trip.ticketPrice} грн</td>
              <td>{moment(trip.date).format("YYYY-MM-DDTHH:mm")}</td>

              <td>
                {isTripBooked(trip.id) ? (
                  <Button
                    onClick={() => handleCancelBooking(trip.id)}
                    variant="danger"
                    size="sm"
                  >
                    Відмінити бронь
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleBookTrip(trip.id)}
                    variant="success"
                    size="sm"
                  >
                    Забронювати
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
