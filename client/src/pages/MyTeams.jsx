import React, { useState, useEffect } from 'react';
import mockUser from '../data/user';
import { teams } from '../data/teams';
import { Button } from 'react-bootstrap';

function MyTeams({ loggedIn }) {
  const [id, setId] = useState('');

  useEffect(() => {
    if (loggedIn) {
      setId(mockUser.id);
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div>
        <Button variant="primary">Přihlásit se</Button>
        <Button variant="secondary">Registrovat se</Button>
      </div>
    );
  }

  const userTeams = teams.filter(team => team.id === id);

  return (
    <div>
      <h3>Moje týmy:</h3>
      {userTeams.length > 0 ? (
        userTeams.map(team => (
          <h1 key={team.id}>{team.name}</h1>
        ))
      ) : (
        <p>Nemáte žádné týmy.</p>
      )}
    </div>
  );
}

export default MyTeams;