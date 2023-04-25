import React, { useState } from "react";

import { Form, Row, Col, Button } from "react-bootstrap";

import moment from "moment";

type SearchProps = {
  onSearch: (searchParams: SearchParams) => void;
  onClear: () => void;
};

type SearchParams = {
  from: string;
  to: string;
  date: string;
};

export const Search: React.FC<SearchProps> = ({ onSearch, onClear }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch({ from, to, date: moment(date).toISOString() });
  };

  const handleClearInput = () => {
    setFrom("");
    setTo("");
    setDate(new Date());
    onClear();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="from">
              <Form.Label>Звідки</Form.Label>
              <Form.Control
                type="text"
                placeholder="Місто відправлення"
                value={from}
                onChange={(event) => setFrom(event.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="to">
              <Form.Label>Куди</Form.Label>
              <Form.Control
                type="text"
                placeholder="Місто прибуття"
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
                placeholder="Запланована дата"
                value={moment(date).format("YYYY-MM-DD")}
                onChange={(event) =>
                  setDate(moment(event.target.value).toDate())
                }
              />
            </Form.Group>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
              marginTop: "30px",
            }}
          >
            <Button variant="primary" type="submit">
              Пошук
            </Button>
            <Button variant="secondary" onClick={handleClearInput}>
              Очистити
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
