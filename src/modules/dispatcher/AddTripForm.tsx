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

  const dispatch = useAppDispatch();

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
        <Modal.Title>Добавить поездку</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="carBrand">
            <Form.Label>Марка машины</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите марку машины"
              value={carBrand}
              onChange={(event) => setCarBrand(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="from">
            <Form.Label>Откуда</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите город отправления"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="to">
            <Form.Label>Куда</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите город прибытия"
              value={to}
              onChange={(event) => setTo(event.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="passengers">
            <Form.Label>Количество пассажиров</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={passengers}
              onChange={(event) => setPassengers(Number(event.target.value))}
            />
          </Form.Group>

          <Form.Group controlId="ticketPrice">
            <Form.Label>Стоимость билета</Form.Label>
            <Form.Control
              type="number"
              value={ticketPrice}
              onChange={(event) => setTicketPrice(parseInt(event.target.value))}
            />
          </Form.Group>

          <Form.Group controlId="date">
            <Form.Label>Дата и время</Form.Label>
            <Form.Control
              type="datetime-local"
              value={moment(date).format("YYYY-MM-DDTHH:mm")}
              onChange={(event) => setDate(moment(event.target.value).toDate())}
              // type="datetime-local"
              // value={date.toISOString().slice(0, -8)}
              // onChange={(event) => setDate(new Date(event.target.value))}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleAddTripClose()}>
            Отменить
          </Button>

          <Button variant="primary" type="submit">
            Добавить
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddTripForm;
