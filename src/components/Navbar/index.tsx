import { useContext } from "react";
import { NavLink, Link, BrowserRouter as Router } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import { GlobalContext } from "../../globalContext";

export const NavbarComponent = () => {
  const { isLoggedIn } = useContext(GlobalContext);
  console.log(isLoggedIn);

  return (
    <Router>
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
            <span className="mx-2">My Blog</span>
          </Navbar.Brand>
          <Nav className="d-flex justify-content-end ">
            <Nav.Link href="/">Home</Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link href="/editor">New Article</Nav.Link>
                <Nav.Link href="/settings">Settings</Nav.Link>
                <Nav.Link href="">User name</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className="nav-item" href="/login">
                  Sign in
                </Nav.Link>
                <Nav.Link className="nav-item" href="/register">
                  Sign up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </Router>
  );
};
