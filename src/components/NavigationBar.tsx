import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/redux-hook";
import { removeUser } from "../store/user/slice";

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(removeUser());

    localStorage.removeItem("currentUser");

    navigate("/login");
  };

  return (
    <>
      <Navbar expand="xxl" expanded={expanded}>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown.Item style={{ height: "3rem", width: "100px" }}>
              <Link to={"/profile"}>Profile</Link>
            </NavDropdown.Item>

            <NavDropdown.Item style={{ height: "3rem", width: "100px" }}>
              <Link to={"/homepage"}>HomePage</Link>
            </NavDropdown.Item>

            <NavDropdown.Item style={{ height: "3rem", width: "100px" }}>
              <Link to={"/edituser"}>Edit Users</Link>
            </NavDropdown.Item>

            <NavDropdown.Divider style={{ width: "100px" }} />

            <NavDropdown.Item
              onClick={logoutUser}
              style={{ height: "3rem", width: "100px" }}
            >
              Logout
            </NavDropdown.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
