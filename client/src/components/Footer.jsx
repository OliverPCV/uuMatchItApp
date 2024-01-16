import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function AppFooter() {
  return (
    <footer className="bg-dark text-light py-3">
      <Container>
        <Row>
          <Col md={6}>
            &copy; {new Date().getFullYear()} Matchit
          </Col>
          <Col md={6} className="text-md-end">
            Contact: matchit@OliverZeZemlasoftu.it
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default AppFooter;
