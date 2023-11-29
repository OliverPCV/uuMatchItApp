import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
//import { useHistory } from 'react-router-dom';
import '../styles/page-style/TeamCreate.css';

function CreateTeam() {
  const [teamData, setTeamData] = useState({
    name: '',
  });

  //const history = useHistory();

  const handleChange = (e) => {
    setTeamData({ ...teamData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(teamData);
  };

  return (
    <Container>
      <h1>Create a Team</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="teamName">
          <Form.Label>Tournament Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Team Name" 
            name="name" 
            value={teamData.name} 
            onChange={handleChange} 
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Team
        </Button>
      </Form>
    </Container>
  );
}

export default CreateTeam;
