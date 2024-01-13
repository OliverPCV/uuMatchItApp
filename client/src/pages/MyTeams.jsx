import React, { useState, useEffect } from 'react';
import "../styles/page-style/MyTeams.css"
import TeamCard from '../components/TeamCard';
import { Button } from 'react-bootstrap';
import { fetchUserData, isLoggedIn } from '../services/authService';
import { fetchTeamData } from '../services/teamService';

function MyTeams() {
  const [id, setId] = useState('');
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeamData()
      .then(data => {
        setTeams(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    if (isLoggedIn) {
      setId(sessionStorage.getItem('userId'));
      fetchUserData().then(data => {
        setId(data.Id);
        console.log(id);
      }).catch(error => {
        console.error('Error fetching teams:', error);
      });
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <h4 Uživatel className="text-right">Uživatel není přihlášený</h4>
    );
  }

  const userTeams = teams.filter(team => team.owner.Id === id);

  return (
    <div className='myt-main'>
      <h3>Moje týmy:</h3>
      {userTeams.length > 0 ? (
        userTeams.map(team => (
          <TeamCard key={team.id} data={team} />
        ))
      ) : (
        <p>Nejste přihlášený.</p>
      )}
    </div>
  );
}

export default MyTeams;
