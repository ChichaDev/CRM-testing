import React, { useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { fetchTripsAsync } from "../../store/trips/slice";
import { useAppDispatch } from "../../store/redux-hook";

import moment from "moment";

type Props = {
  show: boolean;
  handleAddTripClose: () => void;
};

const AddTripForm: React.FC<Props> = ({ show, handleAddTripClose }) => {
  const [carBrand, setCarBrand] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [passengers, setPassengers] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [date, setDate] = useState(new Date());

  const [isErrorPassengers, setIsErrorPassengers] = useState(false);
  const [isErrorPriceTicket, setIsErrorPriceTicket] = useState(false);

  const dispatch = useAppDispatch();

  const handleChangePassengers = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value);
    if (value <= 12) {
      setPassengers(value);
      setIsErrorPassengers(false);
    } else {
      setIsErrorPassengers(true);
    }
  };

  const handleChangePriceTicket = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(event.target.value);
    if (value <= 10_000 && value > 100) {
      setTicketPrice(value);
      setIsErrorPriceTicket(false);
    } else {
      setIsErrorPriceTicket(true);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const tripRef = collection(db, "trips");

    addDoc(tripRef, {
      carBrand: carBrand,
      from: from,
      to: to,
      passengers: passengers,
      ticketPrice: ticketPrice,
      date: moment(date).toISOString(),
    });

    setCarBrand("");
    setFrom("");
    setTo("");
    setPassengers(0);
    setTicketPrice(0);
    console.log("Trip added to DB");
    dispatch(fetchTripsAsync());
    handleAddTripClose();
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Додати поїздку</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="carBrand">
            <Form.Label>Автомобіль</Form.Label>
            <Form.Control
              type="text"
              placeholder="Марка авто"
              value={carBrand}
              onChange={(event) => setCarBrand(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="from">
            <Form.Label>Звідки</Form.Label>
            <Form.Control
              type="text"
              placeholder="Оберіть місто відправлення"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="to">
            <Form.Label>Куди</Form.Label>
            <Form.Control
              type="text"
              placeholder="Оберіть місто прибуття"
              value={to}
              onChange={(event) => setTo(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="passengers">
            <Form.Label>Кількість пасажирів</Form.Label>
            <Form.Control
              type="number"
              min="0"
              max="12"
              onChange={handleChangePassengers}
              isInvalid={isErrorPassengers}
              required
            />
            <Form.Control.Feedback type="invalid">
              Максимальна кількість пасажирів - 12
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="ticketPrice">
            <Form.Label>Ціна квитка</Form.Label>
            <Form.Control
              type="number"
              min="100"
              max="10_000"
              onChange={handleChangePriceTicket}
              isInvalid={isErrorPriceTicket}
              required
            />
            <Form.Control.Feedback type="invalid">
              Мінімальна вартість - 100грн, максимальна - 10000грн
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="date">
            <Form.Label>Дата та час</Form.Label>
            <Form.Control
              type="datetime-local"
              value={moment(date).format("YYYY-MM-DD")}
              onChange={(event) => setDate(moment(event.target.value).toDate())}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleAddTripClose()}>
            Відмінити
          </Button>

          <Button variant="primary" type="submit">
            Додати
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddTripForm;
