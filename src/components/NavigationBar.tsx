import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Navbar expand="xxl" expanded={expanded}>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown.Item
              style={{ height: "3rem", width: "100px" }}
              href="#driver"
            >
              Driver
            </NavDropdown.Item>
            <NavDropdown.Item
              style={{ height: "3rem", width: "100px" }}
              href="#admin"
            >
              Admin
            </NavDropdown.Item>
            <NavDropdown.Item
              style={{ height: "3rem", width: "100px" }}
              href="#user"
            >
              User
            </NavDropdown.Item>
            <NavDropdown.Divider style={{ width: "100px" }} />
            <NavDropdown.Item
              style={{ height: "3rem", width: "100px" }}
              href="#logout"
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
