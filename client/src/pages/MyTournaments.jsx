import React, { useState, useEffect } from 'react';
import { fetchTournaments } from '../services/tourService';
import { isLoggedIn } from '../services/authService';
import TournamentCard from '../components/TournamentCard';
import { Button } from 'react-bootstrap';
import "../styles/page-style/MyTournaments.css";

function MyTournamentsPage() {
  const [userTournaments, setUserTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');

  useEffect(() => {
    if (isLoggedIn()) {
      fetchTournaments().then(tournaments => {
        const userId = JSON.parse(sessionStorage.getItem('user')).id;
        const filteredTournaments = tournaments.filter(tournament => tournament.ownerId === userId);
        setUserTournaments(filteredTournaments);
        setLoading(false);
        console.log(filteredTournaments);
      }).catch(error => {
        console.error('Error fetching tournaments:', error);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn()) {
    return (
      <div>
        <Button variant="primary">Přihlásit se</Button>
        <Button variant="secondary">Registrovat se</Button>
      </div>
    );
  }

  return (
    <div className='myt-main'>
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
