import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

type SearchProps = {
  onSearch: (searchParams: SearchParams) => void;
};

type SearchParams = {
  from: string;
  to: string;
  date: Date;
};

export const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch({ from, to, date: new Date(date) });
    console.log("SUBMIT work");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group controlId="from">
            <Form.Label>Откуда</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите место отправления"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="to">
            <Form.Label>Куда</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите место назначения"
              value={to}
              onChange={(event) => setTo(event.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="date">
            <Form.Label>Дата</Form.Label>
            <Form.Control
              type="date"
              placeholder="Введите дату"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Button variant="primary" type="submit">
            Найти
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
