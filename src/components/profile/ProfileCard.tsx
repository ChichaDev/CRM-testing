import { useAppSelector } from "../../store/redux-hook";
import { getUserInfo } from "../../store/user/selector";

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
          <Card.Title>Welcome, {displayName || "User"}!</Card.Title>
          <Card.Text>Your email is {email || "not found"}.</Card.Text>
          <Card.Text>
            <h5>Your phoneNumber is {phoneNumber || "not found"}</h5>
          </Card.Text>
          <Row>
            <Col>
              <Button variant="primary">Edit Profile</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};
