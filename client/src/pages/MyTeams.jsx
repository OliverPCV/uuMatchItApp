import React, { useState, useEffect } from 'react';
import { teams } from '../data/teams';
import "../styles/page-style/MyTeams.css"
import TeamCard from '../components/TeamCard';
import { Button } from 'react-bootstrap';
import mockUser from '../data/user';

function MyTeams(loggedIn) { // Zde jsem přidal destrukturalizaci pro loggedIn
  const [id, setId] = useState('');

  useEffect(() => {
    if (loggedIn) {
      setId(mockUser.id); // Nastavte ID pouze pokud je uživatel přihlášen
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div >
        <Button variant="primary">Přihlásit se</Button>
        <Button variant="secondary">Registrovat se</Button>
      </div>
    );
  }

  const userTeams = teams.filter(team => team.ownerId === id); // Použijte ID získané ze stavu

  return (
    <div className='myt-main'>
      <h3>Moje týmy:</h3>
      {userTeams.length > 0 ? (
        userTeams.map(team => (
          <TeamCard key={team.id} data={team} />
        ))
      ) : (
        <p>Nemáte žádné turnaje.</p>
      )}
    </div>
  );
}

export default MyTeams;