import { Card } from "react-bootstrap";

import { useAppSelector } from "../store/redux-hook";
import { getUserInfo } from "../store/user/selector";

export const ProfileCard = () => {
  const { email, phoneNumber, displayName, avatar } =
    useAppSelector(getUserInfo);

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: "20rem" }}>
        <div
          className="rounded-circle mx-auto"
          style={{ width: "50%", overflow: "hidden" }}
        >
          <Card.Img variant="top" src={avatar} />
        </div>
        <Card.Body>
          <Card.Title className="text-center" as={"h2"}>
            Вітаю, {displayName || "User"}!
          </Card.Title>
          <hr style={{ margin: "1rem 0" }} />
          <Card.Text as="h5">Ваша email адреса: {email || "---"}.</Card.Text>
          <hr style={{ margin: "1rem 0" }} />
          <Card.Text as="h5">
            Ваш номер телефону: {phoneNumber || "---"}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
