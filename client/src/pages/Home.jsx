import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Home() {
  const tournaments = [
    { name: 'Turnaj 1', date: '1. července 2023', location: 'Praha' },
    { name: 'Turnaj 2', date: '15. srpna 2023', location: 'Brno' },
    { name: 'Turnaj 3', date: '5. září 2023', location: 'Ostrava' },
  ];

  return (
    <Container>
      <h1>Fotbalové turnaje</h1>
      <Row>
        {tournaments.map((tournament, index) => (
          <Col key={index} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>{tournament.name}</Card.Title>
                <Card.Text>
                  Datum: {tournament.date}
                  <br />
                  Místo: {tournament.location}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
