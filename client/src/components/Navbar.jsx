import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Modal, Button, Form, Dropdown } from 'react-bootstrap';
import axiosInstance from '../services/axiosInstance';
import MatchitLogo from '../images/MatchitLogo.png';
import HomeIcon from '../images/home.png';
import '../styles/component-style/Navbar.css';
import { fetchUserData } from '../services/authService';
import { Link } from 'react-router-dom';

function AppNavbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const username = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const isValid = username.trim() !== '' && email.trim() !== '' && password.trim() !== '' && /\S+@\S+\.\S+/.test(email);
    setIsFormValid(isValid);
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetchUserData().then(userData => {
        setUser(userData);
        setLoggedIn(true);
      }).catch(error => {
        console.log('Chyba při načítání uživatelských dat:', error);
      });
    }
  }, []);

  const handleLogin = async () => {
    const username = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    try {
      const response = await axiosInstance.post('/users/login', {
        username: username,
        password: password
      });

      const token = response.data.token;
      sessionStorage.setItem('token', token);

      fetchUserData().then(userData => {
        setUser(userData);
        setLoggedIn(true);
        window.location.reload()
      }).catch(error => {
        console.error('Chyba při načítání uživatelských dat:', error);
        setLoginError('Chyba při načítání uživatelských dat.');
      });

      setShowLogin(false);
    } catch (error) {
      console.error('Chyba při přihlášení:', error);
      setLoginError('Přihlášení selhalo. Zkontrolujte své přihlašovací údaje.');
    }
  };

  const handleRegister = async () => {
    if (isFormValid) {
      const username = document.getElementById('registerName').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      try {
        const response = await axiosInstance.post('/users/register', {
          username: username,
          email: email,
          password: password
        });

        sessionStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
        setShowRegister(false);
      } catch (error) {
        setRegisterError('Registrace selhala. Zkontrolujte zadané údaje.');
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setUser(null);
    setLoggedIn(false);
    window.location.reload()
  };

  const navigateToHome = () => {
    window.location.href = '/';
  }

  return (
    <>
      <Navbar bg="light" variant="dark" expand="lg">
        <img className="navlogo" src={MatchitLogo} alt="Logo" />
        <Container className='container'>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: "green" }} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <button type="button" class="btn btn-success" onClick={navigateToHome}>Domů</button>
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
              <Button variant="btn btn-success" onClick={() => setShowLogin(true)}>Přihlásit</Button>
              <Button variant="btn btn-dark" onClick={() => setShowRegister(true)}>Registrovat</Button>
            </>
          ) : (
            <>
              <Link to={"/userprofile"}>
                <Button variant="btn btn-success">
                  {user.username || 'Nepřihlášený uživatel'}
                </Button>
              </Link>
              <Button variant="btn btn-danger" onClick={handleLogout}>Odhlásit</Button>
            </>
          )}
        </Container>
      </Navbar>

      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Přihlášení</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {loginError && <p className="text-danger">{loginError}</p>}
            <Form.Group controlId="loginEmail">
              <Form.Label>Uživatelské jméno</Form.Label>
              <Form.Control type="email" placeholder="Vaše jméno" />
            </Form.Group>
            <Form.Group controlId="loginPassword">
              <Form.Label>Heslo</Form.Label>
              <Form.Control type="password" placeholder="Vaše heslo" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogin(false)}>Zavřít</Button>
          <Button variant="primary" onClick={handleLogin}>Přihlásit</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRegister} onHide={() => setShowRegister(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registrace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {registerError && <p className="text-danger">{registerError}</p>}
            <Form.Group controlId="registerName">
              <Form.Label>Jméno</Form.Label>
              <Form.Control type="text" placeholder="Vaše jméno" required onChange={validateForm} />
            </Form.Group>
            <Form.Group controlId="registerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Váš email" required onChange={validateForm} />
            </Form.Group>
            <Form.Group controlId="registerPassword">
              <Form.Label>Heslo</Form.Label>
              <Form.Control type="password" placeholder="Vaše heslo" required onChange={validateForm} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRegister(false)}>Zavřít</Button>
          <Button variant="primary" onClick={handleRegister} disabled={!isFormValid}>Registrovat</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AppNavbar;