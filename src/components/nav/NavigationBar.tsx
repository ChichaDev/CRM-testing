import { useState } from "react";

import { Button, Nav, NavDropdown, Navbar } from "react-bootstrap";

import { To, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/redux-hook";
import { removeUser } from "../../store/user/slice";
import { getUserRole } from "../../store/user/selector";

import "./NavigationBar.css";

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);

  const dispatch = useAppDispatch();

  const userRole = useAppSelector(getUserRole);

  const logoutUser = () => {
    dispatch(removeUser());

    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
  };

  const navigate = useNavigate();

  const handleLinkClick = (path: To) => {
    setExpanded(false);
    navigate(path);
  };
  return (
    <>
      <Navbar expand="xxl" expanded={expanded} className="menu">
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav" className="menu-content">
          <div className="menu-overlay" onClick={() => setExpanded(false)} />

          <Nav className="mr-auto">
            <NavDropdown.Item
              onClick={() => handleLinkClick("/profile/dashboard")}
              className="menu-item"
            >
              Профіль
            </NavDropdown.Item>

            {userRole === "passenger" || userRole === "admin" ? (
              <NavDropdown.Item
                onClick={() => handleLinkClick("/passenger/page")}
                className="menu-item"
              >
                Сторінка пасажира
              </NavDropdown.Item>
            ) : null}

            {userRole === "driver" || userRole === "admin" ? (
              <NavDropdown.Item
                onClick={() => handleLinkClick("/driver/page")}
                className="menu-item"
              >
                Сторінка водія
              </NavDropdown.Item>
            ) : null}

            {userRole === "driver" || userRole === "admin" ? (
              <NavDropdown.Item
                onClick={() => handleLinkClick("/driver/trips")}
                className="menu-item"
              >
                Поїдки водія
              </NavDropdown.Item>
            ) : null}

            {userRole === "dispatcher" || userRole === "admin" ? (
              <NavDropdown.Item
                onClick={() => handleLinkClick("/dispatcher/page")}
                className="menu-item"
              >
                Сторінка диспечера
              </NavDropdown.Item>
            ) : null}

            {userRole === "admin" && (
              <NavDropdown.Item
                onClick={() => handleLinkClick("/admin/edituser")}
                className="menu-item"
              >
                Сторінка адміністратора
              </NavDropdown.Item>
            )}

            <NavDropdown.Divider />

            <NavDropdown.Item onClick={logoutUser} className="menu-item">
              Вийти
            </NavDropdown.Item>
          </Nav>
          {expanded && (
            <Button
              className="menu-btn"
              variant="danger"
              onClick={() => setExpanded(false)}
            >
              Закрити
            </Button>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
export default Navigation;
