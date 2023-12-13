import React from 'react';
import { teams } from '../data/teams';

function MyTeams() {

  return (
    <div>
      <h3>Moje týmy:</h3>
      {teams.length > 0 ? (
        teams.map(team => (
          <h1 key={team.id}>{team.name}</h1>
        ))
      ) : (
        <p>Nemáte žádné týmy.</p>
      )}
    </div>
  );
}

export default MyTeams;