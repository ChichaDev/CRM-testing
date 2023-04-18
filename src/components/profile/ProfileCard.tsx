import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hook";
import { getUserInfo } from "../../store/user/selector";
import { fetchUser } from "../../store/user/actions";
import { Button, Card, Col, Row } from "react-bootstrap";

export const ProfileCard = () => {
  const dispatch = useAppDispatch();

  const { email, phoneNumber, displayName, avatar } =
    useAppSelector(getUserInfo);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

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
  // return (
  //   <div>
  //     <div>
  //       <h2>Welcome, {displayName}!</h2>
  //       <p>Your email is {email}.</p>
  //       <div>
  //         <img src={avatar} alt="Photo User" />
  //       </div>

  //       <h2>{phoneNumber || "not number"}</h2>
  //     </div>
  //   </div>
  // );
};
