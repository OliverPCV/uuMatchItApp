import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
//import { useHistory } from 'react-router-dom';
import '../styles/page-style/TournamentCreate.css';

function CreateTournament() {
  const [tournamentData, setTournamentData] = useState({
    name: '',
    location: '',
    teamSize: '',
    prizePool: '',
    format: '',
  });

  //const history = useHistory();

  const handleChange = (e) => {
    setTournamentData({ ...tournamentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tournamentData);
  };

  return (
    <Container>
      <h1>Create a Tournament</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="tournamentName">
          <Form.Label>Tournament Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter tournament name" 
            name="name" 
            value={tournamentData.name} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Form.Group controlId="tournamentLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter location" 
            name="location" 
            value={tournamentData.location} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Form.Group controlId="tournamentTeamCount">
          <Form.Label>Team Count</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter team count" 
            name="teamCount" 
            value={tournamentData.teamCount} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Form.Group controlId="tournamentTeamSize">
          <Form.Label>Team Size</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter team size" 
            name="teamSize" 
            value={tournamentData.teamSize} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Form.Group controlId="tournamentPrizePool">
          <Form.Label>Prize Pool</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter prize pool" 
            name="prizePool" 
            value={tournamentData.prizePool} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Form.Group controlId="tournamentFormat">
          <Form.Label>Format</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter format" 
            name="format" 
            value={tournamentData.format} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Tournament
        </Button>
      </Form>
    </Container>
  );
}

export default CreateTournament;
