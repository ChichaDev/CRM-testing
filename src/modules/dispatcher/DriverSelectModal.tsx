import { useState } from "react";

import { Modal, Button, Form } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../store/redux-hook";
import { getDrivers } from "../../store/drivers/selector";
import { fetchTripsAsync } from "../../store/trips/slice";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

type Props = {
  show: boolean;
  handleClose: () => void;
  tripId: string;
};

const DriverSelectModal: React.FC<Props> = ({ show, handleClose, tripId }) => {
  const [selectedDriverId, setSelectedDriverId] = useState<string>("");

  const dispatch = useAppDispatch();

  const drivers = useAppSelector(getDrivers);

  const handleDriverSelect = async (
    driverId: string,
    tripId: string,
    handleClose: () => void
  ) => {
    const tripRef = doc(db, "trips", tripId);
    const driverRef = doc(db, "drivers", driverId);

    try {
      const driverSnapshot = await getDoc(driverRef);
      const driverName = driverSnapshot.data()?.driver;

      await updateDoc(tripRef, {
        driver: driverName,
      });
    } catch (error) {
      console.error("Error adding driver to trip: ", error);
    }

    setSelectedDriverId("");
    dispatch(fetchTripsAsync());
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Обрати водія</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          {drivers.map((driver) => (
            <Form.Check
              key={driver.id}
              type="radio"
              label={driver.driver}
              name="driver"
              id={`driver-${driver.id}`}
              onChange={() => setSelectedDriverId(driver.id)}
              checked={selectedDriverId === driver.id}
            />
          ))}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Відміна
        </Button>

        <Button
          onClick={() =>
            handleDriverSelect(selectedDriverId, tripId, handleClose)
          }
          variant="primary"
        >
          Обрати
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DriverSelectModal;
