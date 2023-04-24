import { Container } from "react-bootstrap";
import NavigationBar from "./NavigationBar";

export const Header = () => {
  return (
    <Container fluid style={{ position: "relative" }}>
      <NavigationBar />
    </Container>
  );
};
