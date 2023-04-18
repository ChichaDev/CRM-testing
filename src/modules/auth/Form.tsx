import { useState } from "react";
import { Form as Forms, Button, Card, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";

import { useGoogleSignIn } from "./useGoogleSignIn";
import { useFacebookSignIn } from "./useFacebookSignIn";

import PhoneSVG from "../../assets/mobile.svg";

type FormProps = {
  title: string;
  handleClick: (email: string, password: string) => void;
};

export const Form = ({ title, handleClick }: FormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleGoogleSignIn = useGoogleSignIn();

  const handleClickGoogle = async () => {
    await handleGoogleSignIn();
    navigate("/tripspage");
  };

  const registerWithFacebook = useFacebookSignIn();

  const handleClickFacebook = async () => {
    await registerWithFacebook();
    navigate("/tripspage");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await handleClick(email, password);
    setLoading(false);
    navigate("/tripspage");
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div style={{ maxWidth: "400px" }} className="w-100">
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">{title}</h2>
            <Forms onSubmit={handleSubmit}>
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

              <Button disabled={loading} className="w-100 mt-4" type="submit">
                {loading ? "Loading..." : title}
              </Button>
            </Forms>
          </Card.Body>
          <div className="d-flex align-items-center justify-content-center">
            <GoogleLoginButton
              style={{ maxWidth: "240px" }}
              onClick={handleClickGoogle}
            />
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <FacebookLoginButton
              style={{ maxWidth: "240px" }}
              onClick={handleClickFacebook}
            />
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <Link to={"/phoneauth"} style={{ textDecoration: "none" }}>
              <Button
                className="d-flex align-items-center justify-content-space-between"
                style={{
                  width: "240px",
                  height: "45px",
                  fontSize: "18px",
                }}
                variant="info"
              >
                <img
                  src={PhoneSVG}
                  alt="phone login"
                  style={{ width: "30px", height: "30px" }}
                />
                Log In with mobile
              </Button>
            </Link>
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
