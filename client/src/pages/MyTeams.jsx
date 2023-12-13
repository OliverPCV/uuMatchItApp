import React from 'react';
import { teams } from '../data/teams';
import { Button } from 'react-bootstrap';
import "../styles/page-style/MyTeams.css"

function MyTeams() {

  return (
    <div className='myteams-container'>
      <h3>Moje týmy:</h3>
      <div className="my-teams">
        {teams.length > 0 ? (
          teams.map(team => (

            <div class="card-group">
              <div class="card">
                <img src="https://www.saturdayfootball.org/uploads/2/9/9/8/2998227/team-kh_orig.jpg" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">{team.name}</h5>
                  <Button variant="outline-success" >Detail</Button>

                </div>
              </div>

            </div>
          ))
        ) : (
          <p>Nemáte žádné týmy.</p>
        )}
      </div>

    </div>
  );
}

export default MyTeams;