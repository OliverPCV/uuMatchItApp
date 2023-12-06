import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Modal, Button, Form, Dropdown } from 'react-bootstrap';
import mockUser from '../data/user';
import MatchitLogo from '../images/MatchitLogo.png';
import '../styles/component-style/Navbar.css';
import { Link } from 'react-router-dom';

function AppNavbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setUser(mockUser);
    setLoggedIn(true);
    sessionStorage.setItem('user', JSON.stringify(mockUser));
    setShowLogin(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    sessionStorage.removeItem('user');
  };

 

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <img className="navlogo" src={MatchitLogo} alt="Logo" />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>

              {/* Dropdown pro Turnaj */}
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Turnaj
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item ><Link to={"/"}>Procházet Turnaje</Link>  
                </Dropdown.Item>
                  <Dropdown.Item ><Link to={"/tournamentcreate"}>Vytvořit Turnaj</Link> 
                </Dropdown.Item>
                  <Dropdown.Item ><Link to={"/mytournaments"}> Moje Turnaje</Link>  
                </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* Dropdown pro Tým */}
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Tým
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item ><Link to={"/teamcreate"}>Vytvořit Tým</Link></Dropdown.Item>
                  <Dropdown.Item ><Link to={"/myteams"}>Moje Týmy</Link></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

            </Nav>
          </Navbar.Collapse>
          {!loggedIn ? (
            <>
              <Button variant="outline-success" onClick={() => setShowLogin(true)}>Login</Button>
              <Button variant="outline-secondary" onClick={() => setShowRegister(true)}>Register</Button>
            </>
          ) : (
            <>
              <Link to={"/userprofile"}>
              <span style={{ color: 'white', marginRight: '10px' }}>{user?.name}</span>
              </Link>
              <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Container>
      </Navbar>

      {/* Modal pro přihlášení */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="loginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogin(false)}>Close</Button>
          <Button variant="primary" onClick={handleLogin}>Login</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal pro registraci */}
      <Modal show={showRegister} onHide={() => setShowRegister(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="registerName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>

            <Form.Group controlId="registerEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="registerPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRegister(false)}>Close</Button>
          <Button variant="primary">Register</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AppNavbar;
