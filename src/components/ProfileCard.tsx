import { useAppSelector } from "../store/redux-hook";
import { getUserInfo } from "../store/user/selector";

import { Button, Card, Col, Row } from "react-bootstrap";

export const ProfileCard = () => {
  const { email, phoneNumber, displayName, avatar } =
    useAppSelector(getUserInfo);

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: "18rem" }}>
        <div
          className="rounded-circle mx-auto"
          style={{ width: "50%", overflow: "hidden" }}
        >
          <Card.Img variant="top" src={avatar} />
        </div>
        <Card.Body>
          <Card.Title>Вітаю, {displayName || "User"}!</Card.Title>
          <Card.Text>Ваша email адреса {email || "--"}.</Card.Text>
          <Card.Text>
            <h5>Ваш номер телефону {phoneNumber || "--"}</h5>
          </Card.Text>
          <Row>
            <Col>
              <Button variant="primary">Редагувати профіль</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};
