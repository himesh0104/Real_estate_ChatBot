import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { BarChart2, Home, Info } from 'react-feather';

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <BarChart2 size={24} className="me-2" />
          <span>RealEstate Analyzer</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className="d-flex align-items-center">
              <Home size={18} className="me-1" /> Home
            </Nav.Link>
            <Nav.Link href="#about" className="d-flex align-items-center">
              <Info size={18} className="me-1" /> About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;