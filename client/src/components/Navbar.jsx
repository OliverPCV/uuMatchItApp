import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg"> 
      <Container>
        <Navbar.Brand href="/">uuMatchit</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/tournamentdetail">Tournament detail</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <button class="btn btn-outline-success" type="button">login</button>
        <button class="btn btn-outline-secondary" type="button">register</button>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
