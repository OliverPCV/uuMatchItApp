import React, { useState, useEffect } from 'react';
import { fetchTournamentByOwner } from '../services/tourService';
import { isLoggedIn } from '../services/authService';
import TournamentCard from '../components/TournamentCard';
import "../styles/page-style/MyTournaments.css";

function MyTournamentsPage() {
  const [userTournaments, setUserTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn()) {
      const token = sessionStorage.getItem('token');
      fetchTournamentByOwner(token).then(tournaments => {
        setUserTournaments(tournaments);
        setLoading(false);
      }).catch(error => {
        console.error('Error fetching tournaments:', error);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  if (!isLoggedIn()) {
    return <h4 className="text-right">Uživatel není přihlášený</h4>;
  }

  if (loading) {
    return <p>Načítání...</p>;
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
