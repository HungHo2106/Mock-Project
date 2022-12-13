import { useContext } from "react";
import { NavLink, Link, BrowserRouter as Router } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import { GlobalContext } from "../../globalContext";
import { IoCreateOutline, IoSettingsSharp } from "react-icons/io5";

export const NavbarComponent = () => {
  const { isLoggedIn, currentUser } = useContext(GlobalContext);
  console.log(currentUser);
  console.log(isLoggedIn);

  return (
    <>
      <Navbar bg="info px-5 ">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top text-success"
            />
            <span className="mx-2 text-danger">My Blog</span>
          </Navbar.Brand>
          <Nav className="d-flex justify-content-end ">
            <Nav.Link href="/">
              <Link to="/" className="text-decoration-none text-secondary">
                Home
              </Link>
            </Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link href="" className="text-secondary">
                  <Link
                    to="/editor"
                    className="text-decoration-none text-secondary"
                  >
                    <IoCreateOutline className="mb-1 " />
                    New Article
                  </Link>
                </Nav.Link>
                <Nav.Link href="" className="text-secondary">
                  <Link
                    to="/settings"
                    className="text-decoration-none text-secondary"
                  >
                    <IoSettingsSharp className="mb-1 " />
                    Settings
                  </Link>
                </Nav.Link>
                <Nav.Link href="">
                  <Link
                    to={`/profile/${currentUser.user.username}`}
                    className="text-decoration-none text-secondary"
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
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className="nav-item text-secondary" href="/login">
                  <Link
                    to="/login"
                    className="text-decoration-none text-secondary"
                  >
                    Sign in
                  </Link>
                </Nav.Link>
                <Nav.Link className="nav-item text-secondary" href="/register">
                  <Link
                    to="/register"
                    className="text-decoration-none text-secondary"
                  >
                    {" "}
                    Sign up
                  </Link>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
