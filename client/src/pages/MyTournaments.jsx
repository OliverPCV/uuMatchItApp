import React, { useState, useEffect } from 'react';
import mockUser from '../data/user';
import tournaments from '../data/tournaments';
import TournamentCard from '../components/TournamentCard'; // Předpokládám, že máte komponentu pro zobrazení turnaje
import { Button } from 'react-bootstrap'; // Předpokládám, že používáte React-Bootstrap

function MyTournamentsPage( loggedIn ) { // Zde jsem přidal destrukturalizaci pro loggedIn
  const [id, setId] = useState('');

  useEffect(() => {
    if (loggedIn) {
      setId(mockUser.id); // Nastavte ID pouze pokud je uživatel přihlášen
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

  const userTournaments = tournaments.filter(tournament => tournament.ownerId === id); // Použijte ID získané ze stavu

  return (
    <div>
      <h3>Moje turnaje:</h3>
      {userTournaments.length > 0 ? (
        userTournaments.map(tournament => (
          <TournamentCard key={tournament.id} data={tournament} />
        ))
      ) : (
        <p>Nemáte žádné turnaje.</p>
      )}
    </div>
  );
}

export default MyTournamentsPage;
