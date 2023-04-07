import { useRef } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";

export const Signup = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div style={{ maxWidth: "400px" }} className="w-100">
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            <Form>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required ref={emailRef} />
              </Form.Group>

              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required ref={passwordRef} />
              </Form.Group>

              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  required
                  ref={passwordConfirmRef}
                />
              </Form.Group>
              <Button className="w-100 mt-4" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
          <div className="d-flex align-items-center justify-content-center">
            <GoogleLoginButton
              onClick={() => console.log("Hello")}
              style={{ maxWidth: "240px" }}
            />
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <FacebookLoginButton
              onClick={() => console.log("Hello")}
              style={{ maxWidth: "240px" }}
            />
          </div>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </Card>
      </div>
    </Container>
  );
};
