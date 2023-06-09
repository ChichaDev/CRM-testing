import { Container } from "react-bootstrap";

import { PhoneAuthForm } from "./PhoneAuthForm";

export const PhoneAuthPage = () => {
  return (
    <Container
      fluid
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <PhoneAuthForm />
    </Container>
  );
};
