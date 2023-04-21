import { useRef, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink, To, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/redux-hook";
import { removeUser } from "../store/user/slice";

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);

  const dispatch = useAppDispatch();

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
              onClick={() => handleLinkClick("/profile")}
              style={{ height: "3rem", width: "100px" }}
            >
              <NavLink to={"/profile"}>Profile</NavLink>
            </NavDropdown.Item>

            <NavDropdown.Item
              onClick={() => handleLinkClick("/tripspage")}
              style={{ height: "3rem", width: "100px" }}
            >
              <NavLink to={"/tripspage"}>Trips</NavLink>
            </NavDropdown.Item>

            <NavDropdown.Item
              onClick={() => handleLinkClick("/edituser")}
              style={{ height: "3rem", width: "100px" }}
            >
              <NavLink to={"/edituser"}>Edit Users</NavLink>
            </NavDropdown.Item>

            {/* <NavDropdown.Item
              onClick={() => handleLinkClick("/drivertrips")}
              style={{ height: "3rem", width: "100px" }}
            >
              <NavLink to={"/drivertrips"}>Driver Trips</NavLink>
            </NavDropdown.Item> */}

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
