import { useState } from "react";
import { Form as Forms, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";

type FormProps = {
  title: string;
  onClick: () => void;
};

export const Form = ({ title, onClick }: FormProps) => {
  const [telephone, setTelephone] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string | undefined>(
    ""
  );

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div style={{ maxWidth: "400px" }} className="w-100">
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">{title}</h2>
            <Forms>
              <Forms.Group id="telephone">
                <Forms.Label>Mobile</Forms.Label>
                <Forms.Control
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  type="number"
                  required
                />
              </Forms.Group>

              <Forms.Group id="email">
                <Forms.Label>Email</Forms.Label>
                <Forms.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </Forms.Group>

              <Forms.Group id="password">
                <Forms.Label>Password</Forms.Label>
                <Forms.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
              </Forms.Group>
              {title === "Sign Up" && (
                <Forms.Group id="password-confirm">
                  <Forms.Label>Password Confirmation</Forms.Label>
                  <Forms.Control
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    type="password"
                    required
                  />
                </Forms.Group>
              )}

              <Button onClick={onClick} className="w-100 mt-4" type="submit">
                {title}
              </Button>
            </Forms>
          </Card.Body>
          <div className="d-flex align-items-center justify-content-center">
            <GoogleLoginButton style={{ maxWidth: "240px" }} />
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <FacebookLoginButton style={{ maxWidth: "240px" }} />
          </div>

          {title === "Sign In" ? (
            <div className="w-100 text-center mt-2">
              Need an account? <Link to="/signup">Sign Up</Link>
            </div>
          ) : (
            <div className="w-100 text-center mt-2">
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
          )}
        </Card>
      </div>
    </Container>
  );
};
