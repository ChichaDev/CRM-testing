import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { Trips, fetchTripsAsync } from "../../store/trips/slice";
import { useAppDispatch, useAppSelector } from "../../store/redux-hook";

import { authentication, db } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getTrips } from "../../store/trips/selector";
import moment from "moment";

type Props = {
  trips: Trips[];
};

export const DriverTable: React.FC<Props> = ({ trips }) => {
  const dispatch = useAppDispatch();

  const tripsAll = useAppSelector(getTrips);

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

  const currentDriver =
    authentication.currentUser?.displayName ||
    authentication.currentUser?.email;

  const isTripHasDriver = (tripId: string): boolean => {
    const trip = tripsAll.find((trip) => trip.id === tripId);
    return (
      currentDriver !== undefined &&
      (trip?.driver?.includes(currentDriver) ?? false)
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
            <th>Регистрация водителя</th>
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
                    onClick={() => handleAcceptDriver(currentDriver, trip.id)}
                  >
                    Принять заказ
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
