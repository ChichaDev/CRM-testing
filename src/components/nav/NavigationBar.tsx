import { useState } from "react";

import { Button, Nav, NavDropdown, Offcanvas } from "react-bootstrap";

import { To, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/redux-hook";
import { removeUser } from "../../store/user/slice";
import { getUserRole } from "../../store/user/selector";

import { CgProfile } from "react-icons/cg";
import { GiPerson } from "react-icons/gi";
import { MdDirectionsCar } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { BsChevronRight } from "react-icons/bs";

import Burger from "../../assets/burger.svg";
import "./NavigationBar.css";

import useAuth from "../../hooks/useAuth";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const userRole = useAppSelector(getUserRole);

  const { logout } = useAuth();

  const logoutUser = () => {
    dispatch(removeUser());

    logout();
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
          <Offcanvas.Title style={{ marginLeft: "10px" }}>Меню</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav>
            <NavDropdown.Item
              onClick={() => handleLinkClick("/profile/dashboard")}
              className="menu-item"
            >
              <div>
                <CgProfile
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                />
                Профіль
              </div>
              <BsChevronRight size={16} />
            </NavDropdown.Item>

            {userRole === "passenger" || userRole === "admin" ? (
              <NavDropdown.Item
                onClick={() => handleLinkClick("/passenger/page")}
                className="menu-item"
              >
                <div>
                  <GiPerson
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                  />
                  Сторінка пасажира
                </div>
                <BsChevronRight size={16} />
              </NavDropdown.Item>
            ) : null}

            {userRole === "driver" || userRole === "admin" ? (
              <NavDropdown.Item
                onClick={() => handleLinkClick("/driver/page")}
                className="menu-item"
              >
                <div>
                  <MdDirectionsCar
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                  />{" "}
                  Сторінка водія
                </div>
                <BsChevronRight size={16} />
              </NavDropdown.Item>
            ) : null}

            {userRole === "dispatcher" || userRole === "admin" ? (
              <NavDropdown.Item
                onClick={() => handleLinkClick("/dispatcher/page")}
                className="menu-item"
              >
                <div>
                  <FaUsersCog
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                  />
                  Сторінка диспечера
                </div>
                <BsChevronRight size={16} />
              </NavDropdown.Item>
            ) : null}

            {userRole === "admin" && (
              <NavDropdown.Item
                onClick={() => handleLinkClick("/admin/edituser")}
                className="menu-item"
              >
                <div>
                  <FaUserShield
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                  />
                  Сторінка адміністратора
                </div>

                <BsChevronRight size={16} />
              </NavDropdown.Item>
            )}

            <NavDropdown.Item onClick={logoutUser} className="menu-item">
              <div>
                <FiLogOut style={{ marginRight: "10px", marginLeft: "10px" }} />
                Вийти
              </div>
            </NavDropdown.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default Navigation;
