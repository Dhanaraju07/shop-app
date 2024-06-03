import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Navbar bg="light" expand="lg">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          MyStore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {currentPath === "/" && (
              <>
                <Nav.Link as={Link} to="/cart">
                  Cart
                </Nav.Link>
              </>
            )}
            {currentPath.startsWith("/products/") && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">
                  Cart
                </Nav.Link>
              </>
            )}
            {currentPath === "/cart" && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/products/1">
                  Product 1
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
