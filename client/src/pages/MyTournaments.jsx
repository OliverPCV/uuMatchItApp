import React, { useState, useEffect } from 'react';
import { fetchTournamentByOwner } from '../services/tourService';
import { isLoggedIn, fetchUserData } from '../services/authService';
import TournamentCard from '../components/TournamentCard';
import { Button } from 'react-bootstrap';
import "../styles/page-style/MyTournaments.css";

function MyTournamentsPage() {
  const [userTournaments, setUserTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');

  useEffect(() => {
    if (isLoggedIn()) {
      setId(sessionStorage.getItem('userId'));
      fetchUserData().then(data => {
        setId(data.Id);
        console.log(id);
      }).catch(error => {
        console.error('Error fetching teams:', error);
      }
      );
      fetchTournamentByOwner(id).then(tournaments => {
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

  if (!isLoggedIn) {
    return (
      <h4 Uživatel className="text-right">Uživatel není přihlášený</h4>
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
        <p>Nejste přihlášený.</p>
      )}
    </div>
  );
}

export default MyTournamentsPage;
