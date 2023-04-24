import { useRef, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink, To, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/redux-hook";
import { removeUser } from "../store/user/slice";
import { getUserRole } from "../store/user/selector";

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
      <Navbar expand="xxl" expanded={expanded}>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            left: 0,
            backgroundColor: "white",
            zIndex: "1000",
          }}
          id="basic-navbar-nav"
        >
          <Nav className="mr-auto">
            <NavDropdown.Item
              onClick={() => handleLinkClick("/profile/dashboard")}
              style={{ height: "3rem", width: "100px" }}
            >
              Профіль
            </NavDropdown.Item>

            {userRole === "passenger" || userRole === "admin" ? (
              <NavDropdown.Item
                onClick={() => handleLinkClick("/passenger/page")}
                style={{ height: "3rem", width: "100px" }}
              >
                Сторінка пасажира
              </NavDropdown.Item>
            ) : null}

            {userRole === "driver" || userRole === "admin" ? (
              <NavDropdown.Item
                onClick={() => handleLinkClick("/driver/page")}
                style={{ height: "3rem", width: "100px" }}
              >
                Сторінка водія
              </NavDropdown.Item>
            ) : null}

            {userRole === "driver" || userRole === "admin" ? (
              <NavDropdown.Item
                onClick={() => handleLinkClick("/driver/trips")}
                style={{ height: "3rem", width: "100px" }}
              >
                Поїдки водія
              </NavDropdown.Item>
            ) : null}

            {userRole === "dispatcher" || userRole === "admin" ? (
              <NavDropdown.Item
                onClick={() => handleLinkClick("/dispatcher/page")}
                style={{ height: "3rem", width: "100px" }}
              >
                Сторінка диспечера
              </NavDropdown.Item>
            ) : null}

            {userRole === "admin" && (
              <NavDropdown.Item
                onClick={() => handleLinkClick("/admin/edituser")}
                style={{ height: "3rem", width: "100px" }}
              >
                Сторінка адміністратора
              </NavDropdown.Item>
            )}

            <NavDropdown.Divider style={{ width: "100px" }} />

            <NavDropdown.Item
              onClick={logoutUser}
              style={{ height: "3rem", width: "100px" }}
            >
              Вийти
            </NavDropdown.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;

// return (
//   <>
//     <Navbar expand="xxl" expanded={expanded}>
//       <Navbar.Toggle
//         aria-controls="basic-navbar-nav"
//         onClick={() => setExpanded(!expanded)}
//       />
//       <Navbar.Collapse
//         style={{
//           position: "absolute",
//           top: "100%",
//           right: 0,
//           left: 0,
//           backgroundColor: "white",
//           zIndex: "1000",
//         }}
//         id="basic-navbar-nav"
//       >
//         <Nav className="mr-auto">
//           <NavDropdown.Item
//             onClick={() => setExpanded(false)}
//             style={{ height: "3rem", width: "100px" }}
//           >
//             <Link to={"/profile"}>Profile</Link>
//           </NavDropdown.Item>

//           <NavDropdown.Item
//             onClick={() => setExpanded(false)}
//             style={{ height: "3rem", width: "100px" }}
//           >
//             <Link to={"/tripspage"}>Trips</Link>
//           </NavDropdown.Item>

//           <NavDropdown.Item
//             onClick={() => setExpanded(false)}
//             style={{ height: "3rem", width: "100px" }}
//           >
//             <Link to={"/edituser"}>Edit Users</Link>
//           </NavDropdown.Item>

//           <NavDropdown.Divider style={{ width: "100px" }} />

//           <NavDropdown.Item
//             onClick={logoutUser}
//             style={{ height: "3rem", width: "100px" }}
//           >
//             Logout
//           </NavDropdown.Item>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   </>
// );
