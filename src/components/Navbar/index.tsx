import { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import { GlobalContext } from "../../globalContext";
import { IoCreateOutline, IoSettingsSharp } from "react-icons/io5";

export const NavbarComponent = () => {
  const { isLoggedIn, currentUser } = useContext(GlobalContext);

  return (
    <>
      <Navbar bg="info px-5 ">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="text-decoration-none">
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top text-success"
              />
              <span className="mx-2 text-danger ">My Blog</span>
            </Link>
          </Navbar.Brand>
          <Nav className="d-flex justify-content-end ">
            <Link to="/" className="text-decoration-none text-secondary mx-2">
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/editor"
                  className="text-decoration-none text-secondary mx-2"
                >
                  <IoCreateOutline className="mb-1 mx-1" />
                  New Article
                </Link>
                <Link
                  to="/settings"
                  className="text-decoration-none text-secondary mx-2"
                >
                  <IoSettingsSharp className="mb-1 mx-1 " />
                  Settings
                </Link>
                <Link
                  to={`/profile/${currentUser?.user.username}`}
                  className="text-decoration-none text-secondary mx-2"
                >
                  <img
                    alt=""
                    src={currentUser.user.image}
                    width="30"
                    height="30"
                    className="d-inline-block align-top text-success rounded-circle"
                  />
                  <span className="mx-2 text-secondary">
                    {currentUser.user.username}
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-decoration-none text-secondary mx-2"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="text-decoration-none text-secondary mx-2"
                >
                  {" "}
                  Sign up
                </Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
