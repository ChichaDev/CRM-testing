import { useState } from "react";

import { Button, Nav, NavDropdown, Offcanvas } from "react-bootstrap";

import { To, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/redux-hook";
import { removeUser } from "../../store/user/slice";
import { getUserRole } from "../../store/user/selector";

import Burger from "../../assets/burger.svg";
import "./NavigationBar.css";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const userRole = useAppSelector(getUserRole);

  const logoutUser = () => {
    dispatch(removeUser());

    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
  };

  const handleLinkClick = (path: To) => {
    navigate(path);
    setShowMenu(false);
  };

  const handleClose = () => setShowMenu(false);

  const handleShow = () => setShowMenu(true);

  return (
    <>
      <Button variant="outline-light" onClick={handleShow}>
        <img
          src={Burger}
          alt="burger icon"
          className="navbar-toggler-icon"
          style={{ width: "30px", height: "30px" }}
        />
      </Button>

      <Offcanvas show={showMenu} onHide={handleClose} className="menu">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Меню</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav>
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

            <NavDropdown.Item onClick={logoutUser} className="menu-item">
              Вийти
            </NavDropdown.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default Navigation;
